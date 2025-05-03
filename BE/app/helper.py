from fastapi import Depends, HTTPException, Request
from app.database.get_db import get_db
from sqlalchemy.orm import Session
from app.model.user import User

def get_current_user_id(request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.name == request.state.user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.id