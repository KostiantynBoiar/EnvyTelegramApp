from sqlalchemy.orm import relationship

from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, Integer


class User(Base):
    
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    telegram_username = Column(String, nullable=False)
    count_of_coins = Column(Integer)
    last_time_of_the_claim = Column(String)
    referal_link = Column(String)
    tasks = relationship("Task", back_populates="user")
    reffered_by = Column(String)
