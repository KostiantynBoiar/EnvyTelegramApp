
from pydantic import BaseModel
from typing import Optional

from sqlalchemy.orm import relationship


class TaskBaseSchema(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    user_id: Optional[int] = None

    class Config:
        from_attributes = True
        populate_by_name = True

