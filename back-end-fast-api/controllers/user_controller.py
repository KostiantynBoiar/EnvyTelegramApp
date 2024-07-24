import sys
import os

from models.user_model import User

sys.path.append(os.path.join(os.path.dirname(__file__), '../models'))

from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db


app = FastAPI()
router = APIRouter()

@router.get('/')
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    print(users)
    return {'status': 'success', 'results': len(users), 'products': users}

@router.post('/')
def create_user(user: User):
    db = get_db()
