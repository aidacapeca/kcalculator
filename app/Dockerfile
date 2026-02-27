# app/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copiamos todos los archivos de la carpeta app al contenedor
COPY . .

# Instala dependencias
RUN pip install --upgrade pip
RUN pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

# Expone el puerto
EXPOSE 8000

# Comando por defecto
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]