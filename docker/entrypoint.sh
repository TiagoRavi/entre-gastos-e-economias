#!/bin/bash

echo "⏳ Esperando PostgreSQL..."

until pg_isready -h postgres -U $POSTGRES_USER; do
  sleep 1
done

echo "✅ PostgreSQL pronto!"

echo "🚀 Rodando migrations..."
alembic upgrade head

echo "🔥 Iniciando API..."
uvicorn app.main:app --host 0.0.0.0 --port 8000