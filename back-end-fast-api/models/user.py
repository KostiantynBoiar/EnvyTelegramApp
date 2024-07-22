from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, Integer
from sqlalchemy.sql import func
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL


class User(Base):
    
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True,
            server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    telegram_username = Column(String)
    count_of_coins = Column(String)
    last_time_of_the_claim = Column(String)
    referal_link = Column(String)
    reffered_by = Column(String)
