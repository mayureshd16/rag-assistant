from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader, TextLoader

EMBED_MODEL = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")
CHROMA_PATH = "./chroma_db"

def ingest_file(file_path: str):
    loader = PyPDFLoader(file_path) if file_path.endswith(".pdf") else TextLoader(file_path)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=EMBED_MODEL)
    db.add_documents(chunks)
    db.persist()