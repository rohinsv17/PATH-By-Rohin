# Single stage image, the database is built on your computer with ingestion.py and copied in
FROM python:3.12-slim

# Prints logs immediately and keeps the downloaded embedding models in one known folder
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    FASTEMBED_CACHE_PATH=/models

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Downloads the embedding models in their own cached layer so rebuilds do not download them again
RUN python -c "from fastembed import TextEmbedding, SparseTextEmbedding; TextEmbedding(model_name = 'BAAI/bge-large-en-v1.5'); SparseTextEmbedding(model_name = 'Qdrant/bm25')"

# Copies the database built on your computer by running ingestion.py
COPY qdrant_local/ ./qdrant_local/

# Copies only the files the running service needs
COPY config.py query.py main.py ./

# Cloud Run sets PORT when hosted, 8080 is the fallback when running locally
ENV PORT=8080
EXPOSE 8080

# Starts one uvicorn worker, the embedded database can only be opened by a single process
CMD ["sh", "-c", "exec uvicorn main:app --host 0.0.0.0 --port ${PORT}"]