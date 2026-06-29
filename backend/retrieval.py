from llm import get_llm
from database import similarity_search
from prompts import build_prompt


# ======================================================
# Retrieve Context
# ======================================================

def retrieve_context(question: str):

    docs = similarity_search(question)

    context = "\n\n".join(

        doc.page_content

        for doc in docs

    )

    return context, docs


# ======================================================
# Generate Answer
# ======================================================

def generate_answer(question: str):

    context, docs = retrieve_context(question)

    llm = get_llm()

    prompt = build_prompt(

        question=question,

        context=context

    )

    response = llm.invoke(prompt)

    return {

        "answer": response.content,

        "sources": [

            {

                "content": doc.page_content,

                "metadata": doc.metadata

            }

            for doc in docs

        ]

    }


# ======================================================
# Public API
# ======================================================

def answer_query(question: str):

    return generate_answer(question)