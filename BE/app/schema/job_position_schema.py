from pydantic import BaseModel

class JobPositionResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
        
        
class JobPositionRequest(BaseModel):
    name: str

    class Config:
        from_attributes = True