import os
import shutil

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from config import API_PREFIX

from ingestion import ingest_file
from retrieval import answer_query
from streaming import stream_answer

from database import (
    list_documents,
    delete_documents,
    remove_document,
    reset_database
)

app = FastAPI(
    title="Multi-Document RAG API",
    version="1.0.0"
)

# ======================================================
# CORS
# ======================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

# ======================================================
# Upload Document
# ======================================================

@app.post(f"{API_PREFIX}/upload")
async def upload(
    file: UploadFile = File(...)
):

    upload_path = f"/tmp/{file.filename}"

    with open(upload_path, "wb") as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )

    document = ingest_file(upload_path)

    if os.path.exists(upload_path):

        os.remove(upload_path)

    return {

        "status": "success",

        "document": document

    }


# ======================================================
# Query (Normal)
# ======================================================

@app.post(f"{API_PREFIX}/query")
async def query(body: dict):

    questions = body.get("questions")

    if not questions:

        raise HTTPException(

            status_code=400,

            detail="No questions provided."

        )

    answers = []

    for question in questions:

        result = answer_query(question)

        answers.append({

            "question": question,

            "answer": result["answer"],

            "sources": result["sources"]

        })

    return {

        "answers": answers

    }


# ======================================================
# Query (Streaming)
# ======================================================

@app.post(f"{API_PREFIX}/query/stream")
async def stream_query(body: dict):

    question = body.get("question")

    if not question:

        raise HTTPException(

            status_code=400,

            detail="Question is required."

        )

    return StreamingResponse(

        stream_answer(question),

        media_type="application/x-ndjson"

    )


# ======================================================
# List Documents
# ======================================================

@app.get(f"{API_PREFIX}/documents")
async def get_documents():

    return {

        "documents": list_documents()

    }


# ======================================================
# Delete Document
# ======================================================

@app.delete(f"{API_PREFIX}/documents/{{document_id}}")
async def delete_document(
    document_id: str
):

    delete_documents(document_id)

    remove_document(document_id)

    return {

        "status": "deleted",

        "document_id": document_id

    }


# ======================================================
# Clear Database
# ======================================================

@app.delete(f"{API_PREFIX}/clear")
async def clear_database():

    reset_database()

    return {

        "status": "success",

        "message": "Database cleared."

    }


# ======================================================
# Health Check
# ======================================================

@app.get(f"{API_PREFIX}/health")
async def health():
    return {
        "status": "ok"
    }