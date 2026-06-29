# 🤖 Multi-Document RAG Assistant

A production-ready Retrieval-Augmented Generation (RAG) assistant built using **FastAPI**, **LangChain**, **ChromaDB**, **Groq**, and **React**.

---

# Features

* Upload multiple PDF, DOCX and TXT documents
* Semantic search using ChromaDB
* Fast embeddings with BAAI/bge-small-en-v1.5
* AI-powered question answering using Groq GPT-OSS-120B
* Source citation for every answer
* Conversation history
* Dark/Light theme
* Markdown rendering
* Copy responses
* Like/Dislike feedback
* Conversation search
* Pin, rename and delete conversations
* Responsive Material UI interface

---

# Tech Stack

## Backend

* FastAPI
* LangChain
* ChromaDB
* FastEmbed
* Groq API
* Python

## Frontend

* React
* Material UI
* Axios
* React Markdown

---

# Project Structure

```
backend/
│
├── config.py
├── database.py
├── llm.py
├── prompts.py
├── retrieval.py
├── ingestion.py
├── main.py
├── requirements.txt
├── .env.example
├── documents.json
└── chroma_db/
```

---

# Installation

## Clone the repository

```bash
git clone <repository-url>

cd backend
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Create the environment file

Copy:

```text
.env.example
```

to

```text
.env
```

and add your Groq API key.

Example:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Start the server

```bash
uvicorn main:app --reload
```

The API will be available at:

```
http://localhost:8000
```

---

# API Endpoints

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| POST   | /api/v1/upload         | Upload a document       |
| POST   | /api/v1/query          | Ask questions           |
| GET    | /api/v1/documents      | List uploaded documents |
| DELETE | /api/v1/documents/{id} | Delete a document       |
| GET    | /api/v1/health         | Health check            |

---

# Deployment

The backend is designed for deployment on Railway.

Environment Variables required:

```
GROQ_API_KEY
```

---

# Future Improvements

* Streaming AI responses
* Document comparison
* Conversation memory
* Authentication
* Multi-user support
* WebSocket streaming
* Document versioning

---

# License

This project is intended for educational and portfolio purposes.
