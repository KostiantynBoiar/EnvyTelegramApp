from sqlalchemy.orm import relationship

from database import Base
from sqlalchemy import TIMESTAMP, Column, String, Boolean, Integer, ForeignKey



class Task(Base):
    __tablename__ = 'tasks'
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    award = Column(Integer, nullable = False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Relationship to User
    user = relationship('User', back_populates='tasks')