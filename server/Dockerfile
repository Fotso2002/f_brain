# server/Dockerfile

FROM python:3.11-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y build-essential gcc libpq-dev # Gardez les dépendances système

# Copie le fichier requirements.txt
COPY requirements.txt ./

# Installe les dépendances Python listées dans requirements.txt
RUN pip install --no-cache-dir -r requirements.txt # Utilisez pip pour installer les dépendances

# Installe Gunicorn (si vous l'utilisez pour servir l'application)
RUN pip install gunicorn

# Copie le reste du code de l'application
COPY . .

# Exécute makemigrations pendant le build
RUN python manage.py makemigrations translator

EXPOSE 8000

CMD ["gunicorn", "server_config.wsgi:application", "--bind", "0.0.0.0:8000"]