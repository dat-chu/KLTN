import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer
from app.database.base import Base
from sqlalchemy.orm import relationship

class CVApplication(Base):
    __tablename__ = "cv_applications"
    
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("users.id"))
    job_description_id = Column(Integer, ForeignKey("job_descriptions.id"))
    cv_id = Column(Integer, ForeignKey("cvs.id"))
    applied_at = Column(DateTime, default=datetime.datetime.utcnow)

    candidate = relationship("User", back_populates="cv_applications")
    job_description = relationship("JobDescription", back_populates="cv_applications")
    cv = relationship("CV", back_populates="cv_applications")