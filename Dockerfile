# Use official Python slim image
FROM python:3.10-slim

# Ensure /app is writable (important!)
RUN mkdir -p /app/cache && chmod -R 777 /app


# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y git libgl1 libglib2.0-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy your Flask app and other files
COPY . /app

# Expose the port your Flask app will run on
EXPOSE 7860

# Run your Flask app
CMD ["python", "main.py"]
