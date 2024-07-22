from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from models.user_model import User
from database import get_db
from scrappers import rozetka_scrapper
from scrappers.rozetka_scrapper import scrapper


app = FastAPI()
router = APIRouter()

@router.get('/')
def get_users(db: Session = Depends(get_db)):
    products = db.query(User).all()
    print(products)
    return {'status': 'success', 'results': len(products), 'products': products} 