import sys
import os
sys.path.append('../python-bot/')

from fastapi import FastAPI
from aiogram import Dispatcher
from aiogram.types import Update
from bot import Bot, dp, on_startup, on_shutdown

app = FastAPI()

@app.post('/webhook')
async def webhook(update: Update):
    Dispatcher.set_current(dp)
    Bot.set_current(dp.bot)
    await dp.process_update(update)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, log_level="info", reload=True)
