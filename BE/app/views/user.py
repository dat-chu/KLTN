from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.get_db import get_db
from app.model.user import User
from app.schema.user_schema import UserResponse
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=List[UserResponse])
def read_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
