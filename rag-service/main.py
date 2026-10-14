"""
Rohin Vijay
API file for Ask PATH RAG
--------------------------------
Exposes the RAG pipeline to the website as a small web API
"""

import os
import secrets
from contextlib import asynccontextmanager
from fastapi import FastAPI, Header, HTTPException
from openai import RateLimitError
from pydantic import BaseModel, Field
from query import Retriever
from config import (
    SERVICE_KEY,
    API_MAX_MESSAGES,
    API_MAX_MESSAGE_CHARS,
    API_MAX_QUESTION_CHARS,
)

# Shape of one chat message sent by the website
class Message(BaseModel):
    role: str
    content: str = Field(max_length = API_MAX_MESSAGE_CHARS)

# Shape of the request body sent by the website
class ChatRequest(BaseModel):
    messages: list[Message] = Field(max_length = API_MAX_MESSAGES)

# Shape of the response sent back to the website
class ChatResponse(BaseModel):
    reply: str


# Loads the RAG pipeline once when the server starts so models are not reloaded for every question
@asynccontextmanager
async def lifespan(app: FastAPI):

    # Starts local Phoenix tracing only when explicitly enabled, it is never used in the hosted service
    if(os.environ.get("ENABLE_TRACING") == "1"):
        from tracing import initTracing
        initTracing()

    # Warns if the shared secret is missing since every chat request will be rejected
    if(not SERVICE_KEY):
        print("[API] WARNING: RAG_SERVICE_KEY is not set, all /chat requests will be rejected.")

    # Initializes Retriever class and stores it on the app for every request to use
    app.state.retriever = Retriever()
    print("[API] RAG pipeline ready.")

    yield

    # Closes the embedded database when the server shuts down
    app.state.retriever.qdrant_client.close()

# Initializes the FastAPI app with the startup and shutdown behavior above
app = FastAPI(title = "Ask PATH RAG API", lifespan = lifespan)


# == REQUEST CHECKS ==

# Checks the shared secret sent by the website and rejects the request if it does not match
def checkApiKey(api_key: str | None) -> None:

    # Rejects everything if no key is configured so the service is never accidentally left open
    if(not SERVICE_KEY):
        raise HTTPException(status_code = 503, detail = "Service is not configured.")

    # Compares keys in constant time so timing cannot be used to guess the key
    if(not api_key or not secrets.compare_digest(api_key.encode(), SERVICE_KEY.encode())):
        raise HTTPException(status_code = 401, detail = "Invalid API key.")

# Finds the most recent user message, which is the question the RAG pipeline answers
def getLatestQuestion(messages: list[Message]) -> str:

    # Walks backwards through the conversation until a non-empty user message is found
    for message in reversed(messages):
        if(message.role == "user" and message.content.strip()):
            return message.content.strip()

    raise HTTPException(status_code = 400, detail = "No user question found.")


# == ENDPOINTS ==

# Lightweight check used by the website to wake the service and by the host to confirm it is running
@app.get("/health")
def health():
    return {"status": "ok"}

# Answers the latest user question with the RAG pipeline, earlier messages are accepted but not used yet
@app.post("/chat", response_model = ChatResponse)
def chat(request: ChatRequest, x_api_key: str | None = Header(default = None)):

    # Rejects requests without the correct shared secret
    checkApiKey(x_api_key)

    # Extracts the question and rejects it if it is too long
    question = getLatestQuestion(request.messages)
    if(len(question) > API_MAX_QUESTION_CHARS):
        raise HTTPException(status_code = 400, detail = "Question is too long.")

    try:
        # Verbose stays off so questions and retrieved text are never written to the server logs
        answer = app.state.retriever.ragOrchestrator(question, verbose = False)
    except RateLimitError:

        # Passes the LLM usage limit through so the website can show a clear message
        print("[API] LLM usage limit reached.")
        raise HTTPException(status_code = 429, detail = "Usage limit reached.")
    except Exception as error:

        # Logs only the error type and message for debugging, never the question
        print(f"[API] Error while answering: {type(error).__name__}: {error}")
        raise HTTPException(status_code = 502, detail = "The answer could not be generated.")

    return ChatResponse(reply = answer)