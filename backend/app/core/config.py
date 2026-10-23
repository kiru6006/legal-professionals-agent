from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    # Project
    PROJECT_NAME: str = "Legal Professionals Network"
    ENVIRONMENT: str = "development"
    API_V1_STR: str = "/api/v1"

    # Security
    SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ALGORITHM: str = "HS256"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://legalnet_user:legalnet_secure_password@localhost:5432/legalnet_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # S3 / MinIO
    S3_ENDPOINT_URL: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minio_admin"
    S3_SECRET_KEY: str = "minio_secret_password"
    S3_BUCKET_NAME: str = "legalnet-documents"

    # LLM
    DEFAULT_LLM_PROVIDER: str = "openai"  # gemini, openai, anthropic, ollama
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    OLLAMA_BASE_URL: str = "http://localhost:11434"

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
