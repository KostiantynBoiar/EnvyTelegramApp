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

    # Create inline keyboard
    button1 = InlineKeyboardButton(text="Button 1", callback_data='button1', url = "https://sparkling-nougat-ea8049.netlify.app/")
    button2 = InlineKeyboardButton(text="Button 2", callback_data='button2')

    row = [button1, button2]

    rows = [row]
    inline_kb = InlineKeyboardMarkup(inline_keyboard = rows)

    await message.reply("Please choose:", reply_markup=inline_kb)



async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
