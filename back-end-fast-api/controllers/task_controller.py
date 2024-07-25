from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base, get_db
from typing import List

from models.task_model import Task
from models.user_model import User
from schemas.task_schema import TaskBaseSchema

Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()


@app.post("/{user_id}/", response_model=TaskBaseSchema)
def create_task_for_user(user_id: int, task: TaskBaseSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_task = Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/users/{user_id}/tasks/", response_model=List[TaskBaseSchema])
def read_tasks_for_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.tasks

@app.get("/{task_id}", response_model=TaskBaseSchema)
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/{task_id}", response_model=TaskBaseSchema)
def update_task(task_id: int, task: TaskBaseSchema, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.dict().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/{task_id}", response_model=TaskBaseSchema)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return db_task
