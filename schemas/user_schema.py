from typing import Optional, List

from pydantic import BaseModel
from sqlalchemy.orm import relationship

from schemas.task_schema import TaskBaseSchema


class UserBaseSchema(BaseModel):
    id: Optional[int] = None
    telegram_username: str
    count_of_coins: Optional[int] = None
    last_time_of_the_claim: Optional[str] = None
    referal_link: Optional[str] = None
    reffered_by: Optional[str] = None
    tasks: Optional[List[TaskBaseSchema]] = []

    class Config:
        from_attributes = True
        populate_by_name = True

class UserCreateSchema(BaseModel):
    id: Optional[int] = None
    telegram_username: str
    count_of_coins: Optional[int] = None
    last_time_of_the_claim: Optional[str] = None
    referal_link: Optional[str] = None
    reffered_by: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True
