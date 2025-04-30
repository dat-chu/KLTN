from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    password: str
    is_active: int
    role_id: int

    class Config:
        from_attributes = True