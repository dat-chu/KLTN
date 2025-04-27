from fastapi import APIRouter
from app.schema.healthcheck_schema import HealthCheckResponse

router = APIRouter(prefix="/health", tags=["Healthcheck"])

@router.get("/", response_model=HealthCheckResponse)
async def health_check():
    return {"status": "200 OK"}