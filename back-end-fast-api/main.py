import sys
import os
sys.path.append('../python-bot/')

from fastapi import FastAPI
from aiogram import Dispatcher
from aiogram.types import Update
from bot import Bot, dp
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/webhook')
async def webhook(update: Update):
    Dispatcher.set_current(dp)
    Bot.set_current(dp.bot)
    await dp.process_update(update)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, log_level="info", reload=True)
