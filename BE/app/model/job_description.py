import datetime
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Boolean, Text
from app.database.base import Base
from sqlalchemy.orm import relationship

class JobDescription(Base):
    __tablename__ = "job_descriptions"
    
    id = Column(Integer, primary_key=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    job_position_id = Column(Integer, ForeignKey("job_positions.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    experience_year = Column(Integer)
    level = Column(String(50))
    working_type = Column(String(50))
    constract_type = Column(String(50))
    salary_min = Column(Float)
    salary_max = Column(Float)
    status = Column(String(50))
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    job_positions = relationship("JobPosition", back_populates="job_descriptions")
    job_description_programming_languages = relationship(
        "JobDescriptionProgrammingLanguage",
        back_populates="job_description",
        cascade="all, delete-orphan"
    )
    favorites_jobs = relationship("FavoriteJob", back_populates="job_description")
    candidate_feedbacks = relationship("CandidateFeedback", back_populates="job_description")
    cv_applications = relationship("CVApplication", back_populates="job_description")