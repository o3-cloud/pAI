FROM ghcr.io/o3-cloud/agentman/base:main

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app

# Copy application files
COPY agent.py .
COPY fastagent.config.yaml .
COPY fastagent.secrets.yaml .
COPY prompt.txt .

CMD ["python", "agent.py", "-p", "prompt.txt"]