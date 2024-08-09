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
    level=logging.INFO,  # Log level can be set to DEBUG, INFO, WARNING, ERROR, or CRITICAL
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),  # Log to stdout
        logging.FileHandler(f'create_user_{datetime.now().strftime("%Y%m%d")}.log'),  # Log to a file
    ]
)

logger = logging.getLogger(__name__)

URL = getenv("API_URL")

def create_user(user_id: str, username: str):
    data = {
        'telegram_id': f"{user_id}",
        'telegram_username': username
    }
    logger.info(f"Creating user with data: {data}")
    
    try:
        response = requests.post(f'{URL}/api/v1/users/', json=data)
        response.raise_for_status()  
        logger.info(f"User created successfully. Status code: {response.status_code}")
        return 200
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
        return 200
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err}")
        return response.status_code
    except Exception as err:
        logger.error(f"Other error occurred: {err}")
        return None