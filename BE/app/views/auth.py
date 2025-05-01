from fastapi import APIRouter, HTTPException, Depends
from app.model.user import User
from app.authentication.auth import (
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_password,
    decode_token,
)
from app.schema.auth_schema import Token
from app.schema.auth_schema import Register, Login
from sqlalchemy.orm import Session
from app.database.get_db import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
def login(request: Login, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == request.username).first()
    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid Credentials")

    access_token = create_access_token(data={"sub": user.name})
    refresh_token = create_refresh_token(data={"sub": user.name})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer",
        "user": user
    }

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str):
    payload = decode_token(refresh_token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    username = payload.get("sub")
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid payload")

    new_access_token = create_access_token(data={"sub": username})
    new_refresh_token = create_refresh_token(data={"sub": username})

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "Bearer"
    }
    
@router.post("/register")
def register(resquest: Register, db: Session = Depends(get_db)):
    users = db.query(User).all()
    for user in users:
        if user.name == resquest.username:
            raise HTTPException(status_code=400, detail="Username already exists")
        if user.email == resquest.email:
            raise HTTPException(status_code=400, detail="Email already exists")
    username = resquest.username
    email = resquest.email
    password = resquest.password
    
    # Create new user
    new_user = User(
        name=username,
        email=email,
        password=hash_password(password),
        is_active=True,
        role_id=3,  # Assuming role_id 1 is for Candidate
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}
