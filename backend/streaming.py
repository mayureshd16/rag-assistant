import json

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
# Stream Helper
# ======================================================

def stream_event(event: str, data):

    return json.dumps(

        {

            "event": event,

            "data": data

        }

    ) + "\n"


# ======================================================
# Stream Answer
# ======================================================

def stream_answer(question: str):

    try:

        context, docs = retrieve_context(question)
        print("=" * 60)
        print("QUESTION:", question)
        print("DOCS FOUND:", len(docs))
        print("=" * 60)

        llm = get_llm()

        prompt = build_prompt(
            question=question,
            context=context
        )

        yield stream_event(
            "status",
            "Searching uploaded documents..."
        )

        yield stream_event(
            "status",
            "Generating response..."
        )

        for chunk in llm.stream(prompt):

            if not chunk.content:
                continue

            yield stream_event(
                "token",
                chunk.content
            )

        yield stream_event(
            "sources",
            [
                {
                    "content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in docs
            ]
        )

        yield stream_event(
            "done",
            None
        )

    except Exception as e:

        import traceback

        traceback.print_exc()

        yield stream_event(
            "error",
            str(e)
        )