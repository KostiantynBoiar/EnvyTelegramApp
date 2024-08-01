import requests
import sys
from os import getenv
from dotenv import load_dotenv

load_dotenv()

URL = getenv("URL")

def create_user(username: str):
    data = {
        'telegram_username': username
    }
    response = requests.post(f'{URL}/api/v1/users', json=data)
    if response.status_code == 200:
        print(200)
        return 200
    else:
        print(f"Something went wrong! Status code: {response.status_code},\n {response.json}")
        return response.status_code