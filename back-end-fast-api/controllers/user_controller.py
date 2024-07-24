import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../models'))

from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from user_model import *
from database import get_db


app = FastAPI()
router = APIRouter()

@router.get('/')
def get_users(db: Session = Depends(get_db)):
    products = db.query(User).all()
    print(products)
    return {'status': 'success', 'results': len(products), 'products': products} 