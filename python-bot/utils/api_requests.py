import requests
import sys
from os import getenv
from dotenv import load_dotenv

load_dotenv()

URL = getenv("API_URL")

def create_user(user_id: str, username: str):
    data = {
        'telegram_id': f"{user_id}",
        'telegram_username': username
    }
    print(data)
    response = requests.post(f'{URL}/api/v1/users', json=data)
    if response.status_code == 200:
        print(response.status_code)
        return 200
    else:
        print(f"Something went wrong! Status code: {response.status_code},\n {response}")
        return response.status_code