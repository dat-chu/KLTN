from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from app.database.base import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"))
    is_active = Column(Boolean, default=True)
    
    job_descriptions = relationship("JobDescription", back_populates="created_by_user")
    role = relationship("Role", back_populates="users")
    favorite_jobs = relationship("FavoriteJob", back_populates="user")
    candidate_feedbacks = relationship("CandidateFeedback", back_populates="candidate")
    cv_applications = relationship("CVApplication", back_populates="candidate")
    cvs = relationship("CV", back_populates="candidate")

from app.model.role import Role
from app.model.job_description import JobDescription
from app.model.favorite_job import FavoriteJob
from app.model.candidate_feedback import CandidateFeedback
from app.model.cv_application import CVApplication
from app.model.cv import CV
