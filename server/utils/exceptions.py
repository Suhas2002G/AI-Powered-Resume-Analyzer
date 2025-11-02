from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from .response_handler import standard_json_response

async def http_exception_handler(request: Request, exc: HTTPException):
    """
    Handles FastAPI's built-in HTTPException and returns a standard JSON response.
    """
    return standard_json_response(
        status_code=exc.status_code,
        success=False,
        message="Request error",
        error=exc.detail
    )

async def general_exception_handler(request: Request, exc: Exception):
    """
    Handles all unexpected exceptions (Internal Server Errors).
    """
    return standard_json_response(
        status_code=500,
        success=False,
        message="Internal server error",
        error=str(exc)
    )

def register_exception_handlers(app):
    """
    Registers all custom/global exception handlers with the FastAPI app.
    """
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)
