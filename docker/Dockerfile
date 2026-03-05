# Imagem base
FROM python:3.11-slim

# Diretório de trabalho
WORKDIR /app

# Variáveis para evitar arquivos temporários
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependências Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiar projeto
COPY . .

# Tornar entrypoint executável
RUN chmod +x docker/entrypoint.sh

# Porta usada pelo FastAPI
EXPOSE 8000

# Comando inicial
CMD ["bash", "docker/entrypoint.sh"]