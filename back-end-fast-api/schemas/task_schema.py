from typing import List, Optional
from pydantic import BaseModel


class TaskBaseSchema(BaseModel):
    id: str
    title: str
    description: Optional[str]
    user_id: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
