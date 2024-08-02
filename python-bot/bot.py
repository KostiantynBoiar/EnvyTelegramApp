import asyncio
import logging
import sys
from os import getenv
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram import Router
from utils.api_requests import *

load_dotenv()
TOKEN = getenv("BOT_TOKEN")
router = Router()

if TOKEN is None:
    raise ValueError("No BOT_TOKEN environment variable set")

dp = Dispatcher()

@dp.message(Command("bot"))
async def bot_web_hadler(message: Message):
    markup = InlineKeyboardMarkup(
        inline_keyboard = [
            [
                InlineKeyboardButton(
                    text="Web App", 
                    web_app=types.WebAppInfo(url="https://66abe5c0388a074db14ab2a0--sparkling-nougat-ea8049.netlify.app/")
                )
            ]
        ]
    )
    await message.reply("There you go, your app: ", reply_markup = markup)


@dp.message(CommandStart)
async def start(message: Message):
    username = message.from_user.username if message.from_user.id else f'{message.from_user.first_name} {message.from_user.last_name}'
    request = create_user(message.from_user.id, username)
    if request == 500 or request == 400:
        await message.reply(f"Hi, {message.from_user.username}! Thank you for visiting us again")
    
    if request == 200: 
        await message.reply(f'Hello, {message.from_user.username}')


async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
