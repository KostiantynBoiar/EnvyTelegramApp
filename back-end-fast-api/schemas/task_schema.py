
from pydantic import BaseModel
from typing import Optional, List


class TaskBaseSchema(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    award: Optional[int] = None
    user_id: Optional[int] = None
    for_new_users: Optional[bool] = False

    class Config:
        orm_mode = True


class TaskWithUsersSchema(BaseModel):
    id: int
    title: str
    description: str
    users: List[int]

    class Config:
        orm_mode = True

