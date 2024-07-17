FROM python:3.9


WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r backend/requirements.txt 

RUN pip install pytest

RUN pytest --disable-warnings || true

CMD ["python", "app.py"]
