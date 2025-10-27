from typing import Any, Optional, Dict
from fastapi.responses import JSONResponse

class CustomJSONResponse(JSONResponse):
    pass  # Or your custom subclass if needed


# NOTE In Python, putting a * before parameters means:
# All parameters after the * must be passed as keyword arguments — not positionally.

def standard_json_response(
    *,
    status_code: int = 200,
    success: bool = True,
    message: str = "",
    data: Optional[Any] = None,
    metadata: Optional[Dict[str, Any]] = None,
    error: Optional[Any] = None
) -> JSONResponse:
    content = {
        "success": success,
        "message": message,
    }

    if data is not None:
        content["data"] = data
    if metadata is not None:
        content["metadata"] = metadata
    if error is not None:
        content["error"] = error

    return CustomJSONResponse(
        status_code=status_code,
        content=content
    )
