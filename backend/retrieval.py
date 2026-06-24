from langchain_groq import ChatGroq
import os

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

EMBED_MODEL = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

def answer_query(question: str) -> str:
    db = Chroma(
        persist_directory="./chroma_db",
        embedding_function=EMBED_MODEL
    )

    docs = db.similarity_search(question, k=4)

    context = "\n\n".join([doc.page_content for doc in docs])

    llm = ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="openai/gpt-oss-120b",
        temperature=0
    )

    response = llm.invoke(
        f"""
        Answer the question using only the context below.

        Context:
        {context}

        Question:
        {question}
        """
    )

    return response.content

# from langchain_community.vectorstores import Chroma
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain.chains import RetrievalQA
# # from langchain_openai import ChatOpenAI
# from langchain_groq import ChatGroq
# import os

# EMBED_MODEL = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

# def answer_query(question: str) -> str:
#     db = Chroma(persist_directory="./chroma_db", embedding_function=EMBED_MODEL)
#     retriever = db.as_retriever(search_kwargs={"k": 4})
#     # llm = ChatOpenAI(model="gpt-4.1", temperature=0)
#     llm = ChatGroq(
#     groq_api_key=os.getenv("GROQ_API_KEY"),
#     model_name="llama-3.3-70b-versatile",
#     temperature=0
#     )
#     chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
#     return chain.invoke({"query": question})["result"]