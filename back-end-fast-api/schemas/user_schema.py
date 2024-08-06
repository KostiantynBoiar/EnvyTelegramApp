from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.orm import relationship
from datetime import datetime

from schemas.task_schema import TaskBaseSchema


class UserBaseSchema(BaseModel):
    id: int = None
    telegram_username: str
    count_of_coins: Optional[int] = None
    last_time_of_the_claim: Optional[str]
    referal_link: Optional[str] = None
    reffered_by: Optional[int] = None
    tasks: Optional[List[TaskBaseSchema]] = []

    class Config:
        from_attributes = True
        populate_by_name = True

class UserCreateSchema(BaseModel):
    telegram_id: str
    telegram_username: Optional[str] = None
    reffered_by: Optional[int] = None

    class Config:
        from_attributes = True
        populate_by_name = True


class RewardSchema(BaseModel):
    coins: int

class ClaimTimeSchema(BaseModel):
    last_time_of_the_claim: str

    class Config:
        orm_mode = True