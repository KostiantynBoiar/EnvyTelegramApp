from typing import List
from pydantic import BaseModel


class UserBaseSchema(BaseModel):

    id = str
    telegram_username = str
    count_of_coins = str
    last_time_of_the_claim = str
    referal_link = str
    reffered_by = str

    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True