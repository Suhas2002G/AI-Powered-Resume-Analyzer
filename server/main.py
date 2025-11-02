# Standard library imports
import os
from contextlib import asynccontextmanager

# Third-party imports
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware.sessions import SessionMiddleware

# Import routers
from routes import extract_router
from utils.exceptions import register_exception_handlers
from utils.logger_manager import LoggerManager

app = FastAPI()

# Register global exception handlers
register_exception_handlers(app)

# Create logger instance
logger = LoggerManager(__name__, log_type="info")

# Fastapi lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("[Startup] Application starting...")
    yield
    logger.info("[Shutdown] Application shutting down...")



app = FastAPI(lifespan=lifespan)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=os.getenv("FRONTEND_URL"),
#     allow_credentials=True,  # MUST BE TRUE
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#     allow_headers=["*"],
#     expose_headers=["*"]
# )

# app.add_middleware(
#     SessionMiddleware,
#     secret_key=SESSION_KEY,
#     https_only=False   # Set to True in production
# )

# Register routers
# app.include_router(auth_router, prefix="/auth")
app.include_router(extract_router, prefix="/extract")


@app.get("/")
def health_check():
    return {"status": "API Running"}
