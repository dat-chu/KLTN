from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.authentication.auth import (
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_password,
    decode_token,
)
from app.schema.auth_schema import Token

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Fake DB user
fake_user_db = {
    "dat": {
        "username": "dat",
        "email": "dat@example.com",
        "hashed_password": hash_password("123456"),
    }
}

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_user_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid Credentials")

    access_token = create_access_token(data={"sub": user["username"]})
    refresh_token = create_refresh_token(data={"sub": user["username"]})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
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
        "token_type": "bearer"
    }
    
@router.post("/register")
def register(username: str, email: str, password: str):
    if username in fake_user_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = hash_password(password)
    fake_user_db[username] = {
        "username": username,
        "email": email,
        "hashed_password": hashed_password,
    }

    return {"msg": "User registered successfully"}
