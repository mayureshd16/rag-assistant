from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader
)

EMBED_MODEL = FastEmbedEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

CHROMA_PATH = "./chroma_db"


def ingest_file(file_path: str):

    # Select the correct loader based on file extension
    if file_path.lower().endswith(".pdf"):
        loader = PyPDFLoader(file_path)

    elif file_path.lower().endswith(".txt"):
        loader = TextLoader(file_path)

    elif file_path.lower().endswith(".docx"):
        loader = Docx2txtLoader(file_path)

    else:
        raise Exception(
            f"Unsupported file type: {file_path}"
        )

    # Load document
    docs = loader.load()

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_documents(docs)

    # Store in Chroma
    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=EMBED_MODEL
    )

    db.add_documents(chunks)
    db.persist()

    return True