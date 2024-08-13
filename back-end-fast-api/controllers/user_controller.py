import sys
import os
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from models.task_model import Task
from datetime import datetime, timedelta
from schemas.user_schema import UserBaseSchema, UserCreateSchema, RewardSchema, ClaimTimeSchema
from schemas.task_schema import TaskBaseSchema


sys.path.append(os.path.join(os.path.dirname(__file__), '../models'))

from models.user_model import User
from database import get_db, Base, engine

#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()


@router.get("/", response_model=List[UserBaseSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users  # Just return the list of users


@router.get("/{user_id}", response_model=UserBaseSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=UserBaseSchema)
def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.telegram_id == user.telegram_id).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this telegram_id already exists")

    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    new_tasks = db.query(Task).filter_by(for_new_users=True).all()
    for task in new_tasks:
        new_task = Task(
            title=task.title,
            description=task.description,
            award=task.award,
            user_id=db_user.id,
            for_new_users=False
        )
        db.add(new_task)
    db.commit()

    return db_user


@router.put("/{user_id}", response_model=UserBaseSchema)
def update_user(user_id: int, user: UserCreateSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/{user_id}", response_model=UserBaseSchema)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    for task in tasks:
        db.delete(task)
    
    db.delete(db_user)
    db.commit()
    return db_user



@router.post("/referral", response_model=UserBaseSchema)
def create_user_with_referral(user: UserCreateSchema, referal_link: str, db: Session = Depends(get_db)):
    referrer = db.query(User).filter(User.referal_link == referal_link).first()
    if not referrer:
        raise HTTPException(status_code=404, detail="Invalid referral link")
    
    user_data = user.dict()
    user_data['reffered_by'] = referrer.id
    if 'reffered_by' in user_data:
        del user_data['reffered_by']
    
    db_user = User(**user_data, reffered_by=referrer.id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    tasks = db.query(Task).all()
    for task in tasks:
        new_task = Task(
            title=task.title,
            description=task.description,
            award=task.award,
            user_id=db_user.id
        )
        db.add(new_task)
    db.commit()
    return db_user


@router.get("/name/{telegram_username}", response_model=Optional[int])
def get_user_id_by_telegram_username(telegram_username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.telegram_username == telegram_username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.id


@router.put("/reward/{user_id}", response_model=UserBaseSchema)
def let_reward_for_the_user(user_id: int, reward: RewardSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.count_of_coins += reward.coins
    db.commit()
    db.refresh(user)
    return user


@router.get("/id/{telegram_id}", response_model=Optional[int])
def get_user_id_by_telegram_id(telegram_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.id   


@router.get("/referrals/{user_id}", response_model=List[UserBaseSchema])
def get_referrals_by_user_id(user_id: int, db: Session = Depends(get_db)):
    referrer = db.query(User).filter(User.id == user_id).first()
    if not referrer:
        raise HTTPException(status_code=404, detail="Referrer not found")
    
    referrals = db.query(User).filter(User.reffered_by == user_id).all()
    return referrals


@router.put("/claim/{user_id}", response_model=UserBaseSchema)
def update_last_claim_time(user_id: int, reward: RewardSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    current_time = datetime.utcnow()
    if user.last_time_of_the_claim:
        last_claim_time = datetime.fromisoformat(user.last_time_of_the_claim)
        if (current_time - last_claim_time) < timedelta(hours=24):
            raise HTTPException(status_code=500, detail="Claim not allowed. 24 hours have not passed since the last claim.")
            
    user.count_of_coins += reward.coins
    user.last_time_of_the_claim = current_time.isoformat()
    db.commit()
    db.refresh(user)
    return user


@router.get("/claim/{user_id}", response_model=ClaimTimeSchema)
def get_last_claim_time(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.last_time_of_the_claim == None:
        db_user.last_time_of_the_claim = ""
        return {"last_time_of_the_claim": str(db_user.last_time_of_the_claim)} 
    return {"last_time_of_the_claim": str(db_user.last_time_of_the_claim)}


@router.get("/referral/{referral_link}", response_model=UserBaseSchema)
def get_user_by_referral_link(referral_link: str, db: Session = Depends(get_db)):
    
    db_user = db.query(User).filter(User.referal_link == referral_link).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/{user_id}/tasks/{task_id}", response_model=TaskBaseSchema)
def delete_task(user_id: int, task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return task


app.include_router(router)
