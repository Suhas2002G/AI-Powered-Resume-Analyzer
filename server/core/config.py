import os
from dotenv import load_dotenv

# Load .env only in development
if os.getenv("ENV", "development") == "development":
    load_dotenv()

class Settings:
    # Development Phase/Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT")

    # Database
    DB_URL: str = os.getenv("DATABASE_URL")

    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GROK_API_URL = os.getenv("GROK_API_URL")
    GROK_MODEL = os.getenv("GROK_MODEL")

    # JWT-Auth settings
    SECRET_KEY = os.getenv("SECRET_KEY")
    REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_EXPIRE_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    REFRESH_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

    # Google OAuth credentials
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

    # Goggle redirect midleware
    SESSION_KEY = os.getenv("SESSION_SECRET_KEY")

    # OTP expiry time
    OTP_EXPIRY = os.getenv("OTP_EXPIRY")

    # Frontend URL
    FRONTEND_URL = os.getenv("FRONTEND_URL")

    # Email Configuration
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_FROM = os.getenv("MAIL_FROM")
    MAIL_PORT = os.getenv("MAIL_PORT")
    MAIL_SERVER = os.getenv("MAIL_SERVER")

    # Redis Configuration
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
    REDIS_DB = int(os.getenv("REDIS_DB", 0))
    REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")


settings = Settings()
