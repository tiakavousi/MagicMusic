FROM python:3.9

# Set the working directory in the container
WORKDIR /app

COPY . .

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r /backend/requirements.txt 

# Install pytest for testing
RUN pip install pytest

# Run tests
RUN pytest --disable-warnings || true

# Run the application
CMD ["python", "app.py"]
