# Standard library imports
import os
from contextlib import asynccontextmanager

# Third-party imports
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware.sessions import SessionMiddleware

# Import routers and utils
from routes import extract_router
from utils.exceptions import register_exception_handlers
from utils.logger_manager import LoggerManager
from core import settings

# ---------------------------------------------------------
# Setup logger
# ---------------------------------------------------------
logger = LoggerManager(__name__, log_type="info")

# ---------------------------------------------------------
# Define lifespan BEFORE app creation
# ---------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("[Startup] Application starting...")
    yield
    logger.info("[Shutdown] Application shutting down...")

# ---------------------------------------------------------
# Create app instance (only once)
# ---------------------------------------------------------
app = FastAPI(lifespan=lifespan)

# ---------------------------------------------------------
# Register global exception handlers
# ---------------------------------------------------------
register_exception_handlers(app)

# ---------------------------------------------------------
# Middleware (commented until needed)
# ---------------------------------------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.FRONTEND_URL,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# app.add_middleware(
#     SessionMiddleware,
#     secret_key=SESSION_KEY,
#     https_only=False   # Set to True in production
# )

# ---------------------------------------------------------
# Include Routers
# ---------------------------------------------------------
# app.include_router(auth_router, prefix="/auth")
app.include_router(extract_router, prefix="/extract")

# ---------------------------------------------------------
# Health Check Endpoint
# ---------------------------------------------------------
@app.get("/")
def health_check():
    return {"status": "API Running"}
