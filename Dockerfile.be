FROM python:3.9

WORKDIR /app

COPY ./backend .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
