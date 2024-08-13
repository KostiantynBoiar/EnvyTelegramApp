import requests
import sys
from os import getenv
from dotenv import load_dotenv
from datetime import datetime
import logging

# Load environment variables from a .env file
load_dotenv()

# Set up logging configuration
logging.basicConfig(
    level=logging.INFO,  
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),  # Log to stdout
        logging.FileHandler(f'create_user_{datetime.now().strftime("%Y%m%d")}.log'),  
    ]
)

logger = logging.getLogger(__name__)

URL = getenv("API_URL")

def create_user(user_id: str, username: str, referred_by:int):
    data = {
        'telegram_id': str(f"{user_id}"),
        'telegram_username': username,
        'reffered_by': referred_by
    }
    
    logger.info(f"Creating user with data: {data}")

    try:
        get_user_request = requests.get(f"{URL}/api/v1/users/if/{user_id}")
        if get_user_request.status_code != 200:
            response = requests.post(f'{URL}/api/v1/users/', json=data)
            response.raise_for_status()  
            logger.info(f"User created successfully. Status code: {response.status_code}")
            return 200
        else:
            return 500
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err}")
        return response.status_code
    except Exception as err:
        logger.error(f"Other error occurred: {err}")
        return None


def get_user_by_referal_link(referal_link):
    data = {
        "referal_link": referal_link
    }
    try:
        response = requests.get(f'{URL}/api/v1/users/referral/{referal_link}')
        response.raise_for_status()  
        logger.info(f"User created successfully. Status code: {response.status_code}")
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err}")
        return response.status_code
    except Exception as err:
        logger.error(f"Other error occurred: {err}")
        return None