import sys
import os
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from schemas.user_schema import UserBaseSchema, UserCreateSchema

sys.path.append(os.path.join(os.path.dirname(__file__), '../models'))

from models.user_model import User
from models.task_model import Task
from database import get_db, Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()

@router.get("/users/", response_model=List[UserBaseSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {'status': 'success', 'results': len(users), 'users': users}

@router.get("/users/{user_id}", response_model=UserBaseSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users/", response_model=UserBaseSchema)
def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/users/{user_id}", response_model=UserBaseSchema)
def update_user(user_id: int, user: UserCreateSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/users/{user_id}", response_model=UserBaseSchema)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user

# Присоединяем маршруты к приложению
app.include_router(router)
