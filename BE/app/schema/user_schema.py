from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    password: str
    is_active: int

    class Config:
        orm_mode = True