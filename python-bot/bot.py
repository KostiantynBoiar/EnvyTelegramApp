import asyncio
import logging
import sys
import os
from os import getenv
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram import Router
from flask import Flask
from utils.api_requests import create_user

load_dotenv()
TOKEN = getenv("BOT_TOKEN")
URL = getenv("URL")

if TOKEN is None:
    raise ValueError("No BOT_TOKEN environment variable set")

router = Router()
app = Flask(__name__)
logger = logging.getLogger(__name__)

dp = Dispatcher()

"""
@dp.message(Command("bot"))
async def bot_web_handler(message: Message):
    markup = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Web App",
                    web_app=types.WebAppInfo(url=URL)
                )
            ]
        ]
    )
    await message.reply("That's your app: ", reply_markup=markup)
"""
@dp.message(CommandStart())
async def start(message: Message):
    markup = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Web App",
                    web_app=types.WebAppInfo(url=URL)
                )
            ]
        ]
    )
    username = message.from_user.username if message.from_user.username is not None else f'{message.from_user.first_name} {message.from_user.last_name}'
    request = create_user(message.from_user.id, username)
    if request in (500, 400):
        await message.reply(f"Hi, {username}! Thank you for visiting us again, that's your app: ", reply_markup=markup)
    elif request == 200:
        await message.reply(f"Hello, {username} that's your app", reply_markup=markup)

async def main() -> None:
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)

    

def run_flask():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

if __name__ == '__main__':
    from multiprocessing import Process

    # Start Flask in a separate process
    flask_process = Process(target=run_flask)
    flask_process.start()

    # Start bot polling in the main process
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

    # Ensure the Flask process is properly terminated when the main process ends
    flask_process.join()
