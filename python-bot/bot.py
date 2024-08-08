import asyncio
import logging
import sys
import os
from os import getenv
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup
from flask import Flask
from utils.api_requests import create_user

load_dotenv()
TOKEN = getenv("BOT_TOKEN")
URL = getenv("URL")
WEBHOOK_HOST = 'https://envytelegramapp-1.onrender.com'
WEBHOOK_PATH = f'/webhook/{TOKEN}'
WEBHOOK_URL = f"{WEBHOOK_HOST}{WEBHOOK_PATH}"
PORT = int(os.environ.get('PORT', 5000))

if TOKEN is None:
    raise ValueError("No BOT_TOKEN environment variable set")

app = Flask(__name__)

dp = Dispatcher()

@app.route('/')
def index():
    return "Hello, this is the Flask server!"

async def on_startup(bot: Bot):
    await bot.set_webhook(WEBHOOK_URL)

async def on_shutdown(bot: Bot):
    await bot.delete_webhook()

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

async def main():
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp.startup.register(lambda: on_startup(bot))
    dp.shutdown.register(lambda: on_shutdown(bot))
    dp.include_router(router)
    
    await dp.start_polling(bot)

def run_flask():
    app.run(host='0.0.0.0', port=PORT)

if __name__ == '__main__':
    from multiprocessing import Process

    # Start Flask in a separate process
    flask_process = Process(target=run_flask)
    flask_process.start()

    # Start bot webhook in the main process
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    
    # Running asyncio loop in a way that prevents conflicts
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())

    # Ensure the Flask process is properly terminated when the main process ends
    flask_process.join()
