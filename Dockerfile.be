FROM python:3.9

WORKDIR /app

COPY backend/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN apt-get update -y && apt-get install -v vim curl

COPY backend /app
EXPOSE 5000

CMD ["python", "app.py"]
