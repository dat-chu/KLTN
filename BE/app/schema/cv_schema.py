import datetime
from pydantic import BaseModel

class CVs (BaseModel):
    id: int
    candidate_id: int
    file_path: str
    created_at: datetime.datetime
    
    class Config:
        from_attributes = True
        

class CVResponse (BaseModel):
    filename: str
    url: str
    
    class Config:
        from_attributes = True  
        
         
