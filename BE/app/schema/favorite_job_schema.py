from pydantic import BaseModel

class FavoriteJobResponse(BaseModel):
    id: int
    user_id: int
    job_description_id: int
    
    class Config:
        from_attributes = True