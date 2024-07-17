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
from aiogram.types import Message


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
                    web_app=types.WebAppInfo(url="https://6697ad22e4e789a6b27ba75d--sparkling-nougat-ea8049.netlify.app/")
                )
            ]
        ]
    )
    await message.reply("There you go, your app: ", reply_markup = markup)




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
