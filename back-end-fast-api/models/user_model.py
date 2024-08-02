from sqlalchemy.orm import relationship

from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, Integer
import secrets

class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    telegram_username = Column(String, default="")
    telegram_id = Column(String, nullable=False, unique=True)
    count_of_coins = Column(Integer, default=0)
    last_time_of_the_claim = Column(String)
    referal_link = Column(String, unique=True, default=lambda: secrets.token_urlsafe(8))
    tasks = relationship("Task", back_populates="user")
    reffered_by = Column(Integer)
    
    def generate_referral_link(self):
        return secrets.token_urlsafe(8)

