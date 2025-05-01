from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from fastapi.responses import JSONResponse
from app.authentication.auth import decode_token

PUBLIC_PATHS = ["/auth/login", "/auth/register", "/docs", "/openapi.json"]

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return await call_next(request)

        if any(request.url.path.startswith(path) for path in PUBLIC_PATHS):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"detail": "Missing or invalid token"})

        token = auth_header.split(" ")[1]
        payload = decode_token(token)
        if not payload:
            return JSONResponse(status_code=401, content={"detail": "Invalid or expired token"})

        request.state.user = payload.get("sub")
        return await call_next(request)

