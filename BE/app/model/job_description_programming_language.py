from sqlalchemy import Column, ForeignKey, Integer
from app.database.base import Base
from sqlalchemy.orm import relationship

class JobDescriptionProgrammingLanguage(Base):
    __tablename__ = "job_description_programming_languages"
    
    id = Column(Integer, primary_key=True)
    job_description_id = Column(Integer, ForeignKey("job_descriptions.id"))
    programming_language_id = Column(Integer, ForeignKey("programming_languages.id"))

    job_description = relationship("JobDescription", back_populates="job_description_programming_languages")
    programming_language = relationship("ProgrammingLanguage", back_populates="job_description_programming_languages")
    
from app.model.job_description import JobDescription
from app.model.programming_language import ProgrammingLanguage    
