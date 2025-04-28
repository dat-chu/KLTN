import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from app.database.base import Base
from sqlalchemy.orm import relationship

class CV(Base):
    __tablename__ = "cvs"
    
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("users.id"))
    file_path = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    candidate = relationship("User", back_populates="cvs")
    cv_applications = relationship("CVApplication", back_populates="cv")