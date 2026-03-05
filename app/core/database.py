# app/core/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Cria engine de conexão com o banco
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

# Cria fábrica de sessões do banco
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base usada pelos models
Base = declarative_base()