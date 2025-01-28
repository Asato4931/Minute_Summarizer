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
You are a summarizing Chatbot, and are given the communication between 2 corporates, サウンドクリエイト株式会社 and ライトワークス株式会社.
Below indicates which corporate the individual belongs to.
・サウンドクリエイト株式会社所属: 山田太郎、高橋一郎、中村涼、佐藤健
・ライトワークス株式会社所属: 佐藤花子、田中裕子、小林美咲、吉田優子
Using bullet points and markdown if needed , summarize the given context in a concise manner in Japanese.
This should include

a) A summary of the initial inquiry

b) A summary of the history of actions taken following the inquiry

Please add a line of space between these 2 sections.
Context: {context}

The summary should not be longer than 10 lines, and end the output with a line break.


"""

summary_prompt = ChatPromptTemplate.from_template(summary_prompt_template)

homework_prompt_template = """
You are a summarizing Chatbot, and are given the communication between 2 corporates, サウンドクリエイト株式会社 and ライトワークス株式会社.
Below indicates which corporate the individual belongs to.
・サウンドクリエイト株式会社所属: 山田太郎、高橋一郎、中村涼、佐藤健
・ライトワークス株式会社所属: 佐藤花子、田中裕子、小林美咲、吉田優子
Using bullet points and markdown if needed , given the context, search for 
1) Who has a unfinished task
2) What that person needs to do.

'''
Context: {context}
'''

"次のステップ"と章を分けて、
・担当者(不明なら担当企業):
・担当内容:
と1行ずつ出力してください。


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
