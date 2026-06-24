from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ingestion import ingest_file
from retrieval import answer_query
import shutil, os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    path = f"/tmp/{file.filename}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    ingest_file(path)
    return {"status": "ingested", "filename": file.filename}

@app.post("/query")
async def query(body: dict):
    answers = []

    for q in body["questions"]:
        answers.append({
            "question": q,
            "answer": answer_query(q)
        })

    return {"answers": answers}

@app.get("/health")
def health():
    return {"status": "ok"}