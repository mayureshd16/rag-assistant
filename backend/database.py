from functools import lru_cache
import os
import json
import shutil

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings

from config import (
    CHROMA_PATH,
    EMBEDDING_MODEL,
    TOP_K,
    DOCUMENTS_JSON
)

# =====================================================
# Embeddings
# =====================================================

@lru_cache(maxsize=1)
def get_embeddings():

    return FastEmbedEmbeddings(

        model_name=EMBEDDING_MODEL

    )


# =====================================================
# Database
# =====================================================

@lru_cache(maxsize=1)
def get_database():

    return Chroma(

        persist_directory=CHROMA_PATH,

        embedding_function=get_embeddings()

    )


# =====================================================
# Search
# =====================================================

def similarity_search(

    query,

    k=TOP_K

):

    db = get_database()

    return db.similarity_search(

        query,

        k=k

    )


# =====================================================
# Add Documents
# =====================================================

def add_documents(chunks):

    db = get_database()

    db.add_documents(chunks)

    db.persist()


# =====================================================
# Delete Documents
# =====================================================

def delete_documents(document_id):

    db = get_database()

    collection = db._collection

    collection.delete(

        where={

            "document_id": document_id

        }

    )


# =====================================================
# List Uploaded Documents
# =====================================================

def list_documents():

    if not os.path.exists(DOCUMENTS_JSON):

        return []

    with open(

        DOCUMENTS_JSON,

        "r"

    ) as f:

        return json.load(f)


# =====================================================
# Save Uploaded Document
# =====================================================

def save_document(document):

    documents = list_documents()

    documents.append(document)

    with open(

        DOCUMENTS_JSON,

        "w"

    ) as f:

        json.dump(

            documents,

            f,

            indent=4

        )


# =====================================================
# Remove Document Metadata
# =====================================================

def remove_document(document_id):

    documents = [

        doc

        for doc in list_documents()

        if doc["document_id"] != document_id

    ]

    with open(

        DOCUMENTS_JSON,

        "w"

    ) as f:

        json.dump(

            documents,

            f,

            indent=4

        )


# =====================================================
# Reset Entire Database
# =====================================================

def reset_database():

    if os.path.exists(CHROMA_PATH):

        shutil.rmtree(CHROMA_PATH)

    os.makedirs(

        CHROMA_PATH,

        exist_ok=True

    )