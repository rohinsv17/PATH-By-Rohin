import { NextRequest, NextResponse } from "next/server";

// Gives the RAG service extra time to answer, since a first request can wait on a cold start
export const maxDuration = 60;

// How many recent messages are forwarded and how long each may be, matching the RAG service limits
const MAX_FORWARDED_MESSAGES = 6;
const MAX_MESSAGE_CHARS = 8000;

// Shape of one message sent from the chat window
interface IncomingMessage {
    role: "user" | "assistant";
    content: string;
}

// Relays chat requests from the chat window to the RAG service and returns its reply
export async function POST(request: NextRequest) {

    // Reads the address and shared secret of the RAG service from the server environment
    const serviceUrl = process.env.RAG_SERVICE_URL;
    const serviceKey = process.env.RAG_SERVICE_KEY;

    // Guards against missing configuration so the visitor sees a clear message instead of an error
    if (!serviceUrl || !serviceKey) {
        return NextResponse.json({ reply: "Ask PATH is not connected yet. Please check back soon." });
    }

    // Reads the running conversation sent by the chat window
    const body = await request.json();
    const incomingMessages: IncomingMessage[] = Array.isArray(body.messages) ? body.messages : [];

    // Keeps only the most recent messages and trims each one so the RAG service never rejects the size
    const forwardedMessages = incomingMessages.slice(-MAX_FORWARDED_MESSAGES).map((message) => ({
        role: message.role,
        content: String(message.content).slice(0, MAX_MESSAGE_CHARS),
    }));

    try {
        const response = await fetch(`${serviceUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": serviceKey,
            },
            body: JSON.stringify({ messages: forwardedMessages }),
            signal: AbortSignal.timeout(55000),
        });

        // Handles the LLM usage limit with a clear explanation
        if (response.status === 429) {
            return NextResponse.json({ reply: "Ask PATH has hit its usage limit for now. Please try again a bit later." });
        }

        // Handles a question that is longer than the RAG service accepts
        if (response.status === 400) {
            return NextResponse.json({ reply: "That question is a bit long. Could you shorten it and try again?" });
        }

        // Handles any other unsuccessful response from the RAG service
        if (!response.ok) {
            return NextResponse.json({ reply: "Something went wrong reaching Ask PATH. Please try again in a moment." });
        }

        const data = await response.json();
        return NextResponse.json({ reply: data.reply });
    } catch (error) {

        // Logs the cause to the server logs only, never the question, so failures can be diagnosed in Vercel
        console.error("[chat relay] Request to the RAG service failed:", error);

        // Handles a timeout, which usually means the service is still starting up after being idle
        if (typeof error === "object" && error !== null && "name" in error && error.name === "TimeoutError") {
            return NextResponse.json({ reply: "Ask PATH is waking up after being idle. Please try again in about a minute." });
        }

        // Handles any other network failure reaching the RAG service
        return NextResponse.json({ reply: "Ask PATH is temporarily unavailable. Please try again shortly." });
    }
}