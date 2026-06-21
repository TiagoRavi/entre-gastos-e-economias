from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings


# 🔥 Engine com config segura
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,   # evita conexões mortas
    echo=False          # mudar para True se quiser debug SQL
)


# 🔥 Sessão do banco
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# 🔥 Base dos models
Base = declarative_base()


# 🔥 Helper opcional (bom para debug/manual)
def get_db_session():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()