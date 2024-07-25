import sys
import os

from controllers import user_controller, task_controller
from database import engine

sys.path.append('../python-bot/')

from fastapi import FastAPI
from aiogram import Dispatcher
from aiogram.types import Update
from bot import Bot, dp
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.user_controller import *
from models import user_model

user_model.Base.metadata.create_all(bind=engine)

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


app.include_router(user_controller.router, tags=['Users'], prefix='/api/v1/users')
app.include_router(task_controller.router, tags=['Tasks'], prefix='/api/v1/tasks')


@app.post('/webhook')
async def webhook(update: Update):
    Dispatcher.set_current(dp)
    Bot.set_current(dp.bot)
    await dp.process_update(update)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, log_level="info", reload=True)
