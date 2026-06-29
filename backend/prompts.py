from langchain_core.prompts import ChatPromptTemplate

# ======================================================
# System Prompt
# ======================================================

SYSTEM_PROMPT = """
You are an intelligent AI assistant specialized in answering questions from uploaded documents.

Rules:

1. Answer ONLY from the provided context.
2. Never invent or assume information.
3. If the answer is not available, reply:

"I couldn't find the answer in the uploaded documents."

4. Be concise and accurate.
5. Use Markdown formatting.
6. Use bullet points whenever appropriate.
7. Preserve names, numbers and dates exactly as they appear.
8. Do not mention internal implementation details.
"""

# ======================================================
# RAG Prompt
# ======================================================

RAG_PROMPT = ChatPromptTemplate.from_messages(

    [

        (

            "system",

            SYSTEM_PROMPT

        ),

        (

            "human",

            """

Context:

{context}


Question:

{question}

"""

        )

    ]

)

# ======================================================
# Helper
# ======================================================

def build_prompt(

    question,

    context

):

    return RAG_PROMPT.format_messages(

        question=question,

        context=context

    )