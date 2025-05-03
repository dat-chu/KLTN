import datetime
from pydantic import BaseModel


class PostJobCreation(BaseModel):
    title: str
    position: int
    experience: int
    level: str
    workingType: str
    contractType: str
    salaryMin: float
    salaryMax: float
    description: str
    endDate: datetime.datetime
    status: str
    programmingLanguages: list

    class Config:
        from_attributes = True
        
        
class PostJobResponse(BaseModel):
    id: int
    created_by: int
    job_position_id: int
    title: str
    description: str
    experience_year: int
    level: str
    working_type: str
    contract_type: str
    salary_min: float
    salary_max: float
    status: str
    end_date: datetime.datetime
    created_at: datetime.datetime
    updated_at: datetime.datetime
    programming_languages: list[dict] = []

    class Config:
        from_attributes = True
        

class JobPaginationResponse(BaseModel):
    total: int
    jobs: list[PostJobResponse]
    
    class Config:
        from_attributes = True