from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):

    # App
    APP_NAME: str = "Finance Control API"
    APP_ENV: str = "development"

    # Database
    DATABASE_URL: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"
        extra = "ignore"   # 👈 permite variáveis extras no .env


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()