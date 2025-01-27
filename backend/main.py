from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from langchain_openai import ChatOpenAI
import os

from langchain_core.prompts import ChatPromptTemplate

import json


from langchain_core.runnables import RunnablePassthrough


app = FastAPI(
    title="Summarizer API",
    description="A summarizer API",
    version="0.1",
)

origins = {"http://localhost:3000", "http://localhost:5173"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "YOUR_LANGCHAIN_API_KEY"
os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

# Models

model = ChatOpenAI(model="gpt-4o-mini-2024-07-18", temperature=0, streaming=True)


# Prompts

summary_prompt_template = """
You are a summarizing Chatbot, and using bullet points and markdown if needed , summarize the given context in a concise manner in Japanese.
Please write a prompt that is suitable for your needs. (Note: Original included personal information, hence the removal.)

Context: {context}


"""

summary_prompt = ChatPromptTemplate.from_template(summary_prompt_template)

homework_prompt_template = """
You are a summarizing Chatbot, and using bullet points and markdown if needed , summarize the given context in a concise manner in Japanese.
Please write a prompt that is suitable for your needs. (Note: Original included personal information, hence the removal.)

'''
Context: {context}
'''

"""

homework_prompt = ChatPromptTemplate.from_template(homework_prompt_template)


# Chains

summary_chain = summary_prompt | model
homework_chain = homework_prompt | model


# Actual APIs


async def async_get_summary(context: str):
    chain = {"context": RunnablePassthrough()} | summary_chain | homework_chain
    async for event in chain.astream_events(context, version="v2"):
        event_type = event["event"]
        if event_type == "on_chat_model_stream":
            yield {"event_type": event_type, "content": event["data"]["chunk"].content}

    yield {"event_type": "done"}


@app.websocket("/async_summarizer")
async def async_chat(websocket: WebSocket):
    await websocket.accept()
    while True:
        context = await websocket.receive_text()
        async for event in async_get_summary(context):
            if event["event_type"] == "done":
                await websocket.close()
                return
            else:
                await websocket.send_text(json.dumps(event))
