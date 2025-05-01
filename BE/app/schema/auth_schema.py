from pydantic import BaseModel
from app.schema.user_schema import UserResponse

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: UserResponse
    
    
class RefreshToken(BaseModel):
    refresh_token: str
    token_type: str
    access_token: str
    

class Register(BaseModel):
    username: str
    email: str
    password: str
    

class Login (BaseModel):
    username: str
    password: str
