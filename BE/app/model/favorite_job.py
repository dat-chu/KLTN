from sqlalchemy import Column, ForeignKey, Integer
from app.database.base import Base
from sqlalchemy.orm import relationship

class FavoriteJob(Base):
    __tablename__ = "favorite_jobs"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_description_id = Column(Integer, ForeignKey("job_descriptions.id"))

    user = relationship("User", back_populates="favorite_jobs")
    job_description = relationship("JobDescription", back_populates="favorite_jobs")
    

from app.model.job_description import JobDescription
from app.model.user import User