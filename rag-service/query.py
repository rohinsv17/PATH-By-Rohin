"""
Rohin Vijay
Retrieval and query answering file for RAG
--------------------------------
Answers queries on ingested documents with the LLM, grounded in context retrieved from the ingestion
Usage: Imported by main.py to serve the website and by evaluation.py for scoring, it is not run directly
Documents must already be ingested into the embedded Qdrant database in the qdrant_local folder by running ingestion.py first
When running locally with the default settings, install Ollama, pull the LLM model and run "ollama serve" in open terminal for answer generation
"""

from openai import OpenAI
from opentelemetry import trace
from openinference.semconv.trace import SpanAttributes, OpenInferenceSpanKindValues
from qdrant_client import QdrantClient, models
from fastembed import TextEmbedding, SparseTextEmbedding
from config import (
    QDRANT_PATH,
    QDRANT_COLLECTION_NAME,
    OLLAMA_BASE_URL,
    OLLAMA_API_KEY,
    DENSE_EMBEDDING_MODEL,
    LLM_MODEL,
    TOP_K,
    CONTEXT_K,
    MIN_SIMILARITY,
    MAX_TOKENS,
    TEMPERATURE,
    SYSTEM_PROMPT,
)

# Retrieval and generation class
class Retriever:

    # Constructor sets up the embedded Qdrant database, embedding models, and Ollama, and prints config summary
    def __init__(self):
        print("[Retriever] Initializing...")

        # Initializes embedded Qdrant client that reads the database from a local folder
        self.qdrant_client = QdrantClient(path = QDRANT_PATH)

        # Initializes fastembed dense embedding model, the same model used during ingestion
        self.dense_model = TextEmbedding(model_name = DENSE_EMBEDDING_MODEL)

        # Initializes Qdrant fastembed Sparse Embedding model
        self.sparse_model = SparseTextEmbedding(model_name = "Qdrant/bm25")

        # Initializes OpenAI client using Ollama as localhost
        self.ollama_client = OpenAI(base_url = OLLAMA_BASE_URL, api_key = OLLAMA_API_KEY)

        # Gets a named tracer for this module - used to create custom spans
        self.tracer = trace.get_tracer("rag.retriever")

        chunk_count = self.qdrant_client.count(collection_name = QDRANT_COLLECTION_NAME).count
        print(f"[Retriever] Collection '{QDRANT_COLLECTION_NAME}' loaded - {chunk_count} chunks available")

        # Warns if collection is empty meaning ingestion hasn't been run yet
        if(chunk_count == 0):
            print("[Retriever] WARNING: Collection is empty. Run ingestion.py first.")

        print(f"[Retriever] Embedding model: {DENSE_EMBEDDING_MODEL}")
        print(f"[Retriever] LLM: {LLM_MODEL}\n")


    # == QUERY EMBEDDING ==

    # Embeds the user's question into a vector using the same model as ingestion
    def embedQuery(self, question: str) -> list[float]:

        # Opens an EMBEDDING span so this step shows up on its own in Phoenix
        with self.tracer.start_as_current_span("Embed Query") as span:

            # Marks this span as an embedding operation in Phoenix's UI
            span.set_attribute(SpanAttributes.OPENINFERENCE_SPAN_KIND, OpenInferenceSpanKindValues.EMBEDDING.value)

            # Embeds the question locally with BGE-Large through fastembed and takes the single vector
            embedding = list(self.dense_model.embed([question]))[0].tolist()

            # Records the embedding model and vector size on the span
            span.set_attribute("embedding.model", DENSE_EMBEDDING_MODEL)
            span.set_attribute("embedding.dimensions", len(embedding))

            return embedding


    # == HYBRID SEARCH CHUNK RETRIEVAL ==

    # Orchestrates vector search, keyword search, and fusion into a final ranked chunk list
    def retrieveChunks(self, dense_query: list[float], question: str) -> list[dict]:

        # Opens a RETRIEVER span that encapsulates the entire hybrid retrieval process
        with self.tracer.start_as_current_span("Hybrid Search") as span:

            # Marks this span as a retrieval operation in Phoenix's UI
            span.set_attribute(SpanAttributes.OPENINFERENCE_SPAN_KIND, OpenInferenceSpanKindValues.RETRIEVER.value)

            # Records the top_k config so you can see retrieval settings per trace
            span.set_attribute("retrieval.top_k", TOP_K)

            # Records the minimum similarity threshold used to filter results
            span.set_attribute("retrieval.min_similarity", MIN_SIMILARITY)

            # Creates a list to hold sparsely embedded query
            sparse_embed = list(self.sparse_model.embed([question], batch_size = 32))[0]

            # Initializes sparse vector for query
            sparse_query = models.SparseVector(
                indices = sparse_embed.indices.tolist(),
                values = sparse_embed.values.tolist(),
            )

            # Runs Qdrant hybrid search
            results = self.qdrant_client.query_points(
                collection_name = QDRANT_COLLECTION_NAME,
                prefetch = [
                    models.Prefetch(
                        query = dense_query,
                        using = "dense",
                        limit = TOP_K,
                    ),
                    models.Prefetch(
                        query = sparse_query,
                        using = "sparse",
                        limit = TOP_K
                    )
                ],
                query = models.FusionQuery(fusion = models.Fusion.RRF),
                limit = TOP_K,
                with_payload = True,
            )

            # Initializes list to hold final chunks
            chunks = []

            # Unpacks points to be added to list
            for point in results.points:
                chunks.append({
                    "text":   point.payload.get("text"),
                    "source": point.payload.get("source"),
                    "page":   point.payload.get("page"),
                    "score":  round(point.score, 6),
                })

            # Records how many chunks were returned after fusion
            span.set_attribute("retrieval.chunks_returned", len(chunks))

            # Provides maximum score to Phoenix
            if(chunks):
                span.set_attribute("retrieval.top_score", chunks[0]["score"])

            return chunks
    
                
    # == PROMPT ASSEMBLY ==

    # Assembles retrieved chunks and the question into a prompt string for Gemma
    def buildPrompt(self, question: str, chunks: list[dict]) -> str:

        # Tells Gemma no context was found if retrieval returned nothing
        if(not chunks):
            context_block = "No relevant context was found in the document."
        else:
            # Builds numbered context block with source and page label per chunk
            context_parts = []
            for i, chunk in enumerate(chunks, start = 1):
                header = f"[Chunk {i} - {chunk['source']}, page {chunk['page']}]"
                context_parts.append(f"{header}\n{chunk['text']}")
            # Joins all chunks into one context block separated by blank lines
            context_block = "\n\n".join(context_parts)

        # Assembles final prompt with context block and question
        prompt = (f"Context:\n{context_block}\n\nQuestion: {question}")

        return prompt


    # == LLM GENERATION ==

    # Sends prompt to LLM and returns generated answer
    def generateAnswer(self, prompt: str) -> str:

        # Calls Gemma with system prompt for grounding and user prompt with context and question
        response = self.ollama_client.chat.completions.create(model = LLM_MODEL, messages = [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": prompt}], max_tokens = MAX_TOKENS, temperature = TEMPERATURE)

        # Returns the text content of Gemma's response
        return response.choices[0].message.content

    # Orchestrates the full query pipeline and returns a natural language answer
    def ragOrchestrator(self, question: str, verbose: bool = False) -> str:

        # Opens a root CHAIN span that wraps the entire query pipeline
        with self.tracer.start_as_current_span("Root") as span:

            # Marks this as the top-level chain span in Phoenix's UI
            span.set_attribute(SpanAttributes.OPENINFERENCE_SPAN_KIND, OpenInferenceSpanKindValues.CHAIN.value)

            # Records the user's question on the root span for easy inspection
            span.set_attribute(SpanAttributes.INPUT_VALUE, question)

            # Returns early if no documents have been ingested yet
            if(self.qdrant_client.count(collection_name = QDRANT_COLLECTION_NAME).count == 0):
                return "No documents have been ingested yet. Please run ingestion.py first."

            # Step 1 - embed the question into a vector
            dense_query = self.embedQuery(question)

            # Step 2 - hybrid search in Qdrant and return fused ranked chunks
            chunks = self.retrieveChunks(dense_query, question)

            # Step 3 - Keeps only the top CONTEXT_K fused chunks as context for the LLM
            chunks = chunks[:CONTEXT_K]

            # Returns early if no relevant chunks were found
            if(not chunks):
                return "No relevant content found in the document for that question."

            # Prints retrieved chunks and scores for verbose mode
            if(verbose):
                print(f"\n--- Retrieved {len(chunks)} chunks out of {TOP_K} chunks ---")
                for i, chunk in enumerate(chunks, start = 1):
                    print(f"\n[{i}] {chunk['source']} p.{chunk['page']} (score: {chunk['score']})")
                    print(f"    {chunk['text'][:200]}...")
                print(f"{'-'*50}\n")

            # Step 4 - assemble the prompt from chunks and question
            prompt = self.buildPrompt(question, chunks)

            # Step 5 - generate and return the answer from Gemma
            answer = self.generateAnswer(prompt)

            # Records the final answer on the root span
            span.set_attribute(SpanAttributes.OUTPUT_VALUE, answer)

            return answer