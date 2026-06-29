import os
import uuid
from datetime import datetime

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader
)

from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP
)

from database import (
    add_documents,
    save_document
)

LOADERS = {

    ".pdf": PyPDFLoader,

    ".txt": TextLoader,

    ".docx": Docx2txtLoader

}

# ======================================================
# Load Document
# ======================================================

# ======================================================
# Load Document
# ======================================================

def load_document(file_path: str):

    extension = os.path.splitext(file_path)[1].lower()

    loader_class = LOADERS.get(extension)

    if loader_class is None:

        raise Exception(

            f"Unsupported file type: {extension}"

        )

    loader = loader_class(file_path)

    return loader.load()


# ======================================================
# Add Metadata
# ======================================================

def enrich_metadata(

    docs,

    filename,

    document_id,

    uploaded_at

):

    for doc in docs:

        doc.metadata["document_id"] = document_id

        doc.metadata["filename"] = filename

        doc.metadata["uploaded_at"] = uploaded_at

        if "page" not in doc.metadata:

            doc.metadata["page"] = 1

    return docs


# ======================================================
# Split Documents
# ======================================================

def split_documents(docs):

    splitter = RecursiveCharacterTextSplitter(

        chunk_size=CHUNK_SIZE,

        chunk_overlap=CHUNK_OVERLAP

    )

    return splitter.split_documents(docs)


# ======================================================
# Ingest File
# ======================================================

def ingest_file(file_path: str):

    print("=" * 60)

    print("Starting document ingestion...")

    filename = os.path.basename(file_path)

    document_id = str(uuid.uuid4())

    uploaded_at = datetime.now().strftime(

        "%Y-%m-%d %H:%M:%S"

    )

    # ------------------------------
    # Load
    # ------------------------------

    docs = load_document(file_path)

    print(f"Loaded {len(docs)} page(s).")

    # ------------------------------
    # Metadata
    # ------------------------------

    docs = enrich_metadata(

        docs,

        filename,

        document_id,

        uploaded_at

    )

    # ------------------------------
    # Split
    # ------------------------------

    chunks = split_documents(docs)

    print(f"Created {len(chunks)} chunks.")

    # ------------------------------
    # Store in Chroma
    # ------------------------------

    add_documents(chunks)

    # ------------------------------
    # Save Metadata
    # ------------------------------

    save_document({

        "document_id": document_id,

        "filename": filename,

        "uploaded_at": uploaded_at

    })

    print("Document ingested successfully.")

    print("=" * 60)

    return {

        "document_id": document_id,

        "filename": filename,

        "uploaded_at": uploaded_at,

        "chunks": len(chunks)

    }