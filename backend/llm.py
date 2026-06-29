from functools import lru_cache

from langchain_groq import ChatGroq

from config import (
    GROQ_API_KEY,
    LLM_MODEL,
    LLM_TEMPERATURE
)


@lru_cache(maxsize=1)
def get_llm():

    return ChatGroq(

        groq_api_key=GROQ_API_KEY,

        model_name=LLM_MODEL,

        temperature=LLM_TEMPERATURE

    )