#!/bin/bash

echo "Starting Finance Control API..."

# Esperar um pouco o banco iniciar
sleep 5

# Iniciar FastAPI
uvicorn app.main:app --host 0.0.0.0 --port 8000