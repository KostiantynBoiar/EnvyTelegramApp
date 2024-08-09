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
from utils.api_requests import create_user, get_user_by_referal_link
from aiohttp import web
from aiohttp.web_request import Request
from aiohttp.web_response import json_response
from aiogram.filters import Command, CommandObject


load_dotenv()
TOKEN = getenv("BOT_TOKEN")
URL = getenv("URL")

if TOKEN is None:
    raise ValueError("No BOT_TOKEN environment variable set")

router = Router()
app = Flask(__name__)
logger = logging.getLogger(__name__)

dp = Dispatcher()


@router.message(Command('info'))
async def get_user_info(message: types.Message,
                        command: CommandObject):
    args = command.args
    await message.answer(args)

@dp.message(CommandStart())
async def start(message: Message):
    payload = command.args
    user = get_user_by_referal_link(payload)
    """
    if payload:
        user = get_user_by_referal_link(payload)
        if user:
            new_user = create_user(message.from_user.id, referred_by=user.id)
            await message.reply(f"Welcome! You were referred by {user.telegram_username}")
        else:
            await message.reply("Welcome! The referral code is invalid.")
    else:
        
        
"""
    username = message.from_user.username if message.from_user.username is not None else f'{message.from_user.first_name} {message.from_user.last_name}'
    request = create_user(message.from_user.id, username, None)
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
