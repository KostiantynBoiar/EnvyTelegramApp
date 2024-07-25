from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, Integer
from fastapi_utils.guid_type import GUID, GUID_SERVER_DEFAULT_POSTGRESQL


class User(Base):
    
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=True,
            server_default=GUID_SERVER_DEFAULT_POSTGRESQL)
    telegram_username = Column(String, nullable=True,)
    count_of_coins = Column(Integer)
    last_time_of_the_claim = Column(String)
    referal_link = Column(String)
    reffered_by = Column(String)
