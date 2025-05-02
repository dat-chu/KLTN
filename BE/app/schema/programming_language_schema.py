from pydantic import BaseModel

class ProgrammingLanguageResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
        
        
class ProgrammingLanguageRequest(BaseModel):
    name: str

    class Config:
        from_attributes = True
        

class ProgrammingLanguageCreation(BaseModel):
    name: str

    class Config:
        from_attributes = True
        

class ProgrammingLanguageUpdate(BaseModel):
    name: str

    class Config:
        from_attributes = True