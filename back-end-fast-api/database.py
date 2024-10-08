from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# Set up the connection string
POSTGRES_URL = f"{settings.SCHEMATOGO_URL}"
#POSTGRES_URL = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOSTNAME}:{settings.DATABASE_PORT}/{settings.POSTGRES_DB}"


# Create the SQLAlchemy engine
engine = create_engine(
    POSTGRES_URL
)



# Set up session and base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
