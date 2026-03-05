# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.logging import setup_logging
from app.core.database import engine
from app.models.base import Base


# Inicializa sistema de logs
setup_logging()


app = FastAPI(
    title="Finance Control API",
    description="API para controle financeiro pessoal",
    version="1.0.0",
)

# ✅ CORS (necessário para React acessar a API)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Cria todas as tabelas automaticamente
Base.metadata.create_all(bind=engine)

# Registrar rotas da API
app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": "Finance Control API running"
    }