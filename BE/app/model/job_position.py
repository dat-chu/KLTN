from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base
from sqlalchemy.orm import relationship

class JobPosition(Base):
    __tablename__ = "job_positions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    
    job_descriptions = relationship("JobDescription", back_populates="job_positions")
    
from app.model.job_description import JobDescription
