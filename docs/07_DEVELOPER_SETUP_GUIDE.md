# Developer Setup & Local Environment Guide

## 1. Prerequisites

Ensure you have the following installed on your development workstation:
- **Docker & Docker Compose** (v2.20+)
- **Python 3.11+**
- **Node.js 18+ & npm/pnpm**
- **PostgreSQL Client (`psql`)** (optional, for direct inspection)

---

## 2. Infrastructure Setup via Docker Compose

Create a `docker-compose.yml` in the project root to spin up the local supporting services:

```yaml
version: '3.8'

services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: legalnet_postgres
    environment:
      POSTGRES_USER: legalnet_user
      POSTGRES_PASSWORD: legalnet_secure_password
      POSTGRES_DB: legalnet_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U legalnet_user -d legalnet_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: legalnet_redis
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  minio:
    image: minio/minio:latest
    container_name: legalnet_minio
    environment:
      MINIO_ROOT_USER: minio_admin
      MINIO_ROOT_PASSWORD: minio_secret_password
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data

volumes:
  pgdata:
  redisdata:
  miniodata:
```

Start the containers:
```bash
docker compose up -d
```

---

## 3. Backend Setup (FastAPI & Python 3.11+)

The backend supports two database backends:
- **Production / Full Stack**: PostgreSQL 16 with `pgvector`
- **Rapid Local Development**: Embedded SQLite with `aiosqlite` (Zero external setup)

### Quick Start (Local SQLite Mode)
1. Navigate to the backend directory and set up a virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Configure environment variables in `backend/.env`:
   ```env
   PROJECT_NAME="Legal Professionals Network"
   ENVIRONMENT="development"
   SECRET_KEY="dev-secret-key-32-chars-long-demo-local"
   ACCESS_TOKEN_EXPIRE_MINUTES=15

   # Database (Local SQLite)
   DATABASE_URL="sqlite+aiosqlite:///./legalnet.db"

   # LLM Provider Configuration (mock fallback for offline testing)
   DEFAULT_LLM_PROVIDER="mock" # options: gemini, openai, anthropic, ollama, mock
   ```

3. Initialize the database and populate seed taxonomy & sample advocate records:
   ```bash
   python -m app.scripts.seed_directory
   ```

4. Launch the backend API server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   API Documentation is available at: `http://localhost:8000/docs`

---

### Production / PostgreSQL Mode
1. Ensure PostgreSQL 16 + pgvector container or service is running:
   ```bash
   docker compose up -d postgres redis minio
   ```

2. Update `backend/.env` with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql+asyncpg://legalnet_user:legalnet_secure_password@localhost:5432/legalnet_db"
   DEFAULT_LLM_PROVIDER="gemini" # or openai, anthropic, ollama
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. Run database migrations:
   ```bash
   alembic upgrade head
   python -m app.scripts.seed_directory
   ```

---

## 4. Frontend Setup (React + TypeScript + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Configure frontend environment variables in `frontend/.env`:
   ```env
   VITE_API_BASE_URL="http://localhost:8000/api/v1"
   VITE_WS_URL="ws://localhost:8000/api/v1/ai/stream"
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Access the web app at: `http://localhost:5173`

---

## 5. Running Test Suites

- **Backend Unit & Integration Tests**:
  ```bash
  cd backend
  pytest -v --cov=app tests/
  ```

- **Grounding Validation Suite**:
  ```bash
  pytest tests/test_agent_grounding.py
  ```

- **Frontend Linting & Typecheck**:
  ```bash
  cd frontend
  npm run lint
  npx tsc --noEmit
  ```
