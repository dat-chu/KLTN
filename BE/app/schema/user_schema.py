from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    is_active: int
    role_id: int

    class Config:
        from_attributes = True
        
        
class UserPaginationResponse(BaseModel):
    total: int
    users: list[UserResponse]

    class Config:
        from_attributes = True