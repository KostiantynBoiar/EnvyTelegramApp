import asyncio
import logging
import sys
from os import getenv
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram import Router
from aiogram.types import Message


load_dotenv()
TOKEN = getenv("BOT_TOKEN")
router = Router()

if TOKEN is None:
    raise ValueError("No BOT_TOKEN environment variable set")

dp = Dispatcher()

# Define start command handler
@dp.message(CommandStart())
async def send_welcome(message: Message):

    await message.reply("Hello, moron!")


async def on_startup(dp):
    print("Bot is starting...")

async def on_shutdown(dp):
    print("Bot is shutting down...")

    
async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
