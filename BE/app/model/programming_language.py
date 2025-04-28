from sqlalchemy import Column, Integer, String
from app.database.base import Base
from sqlalchemy.orm import relationship

class ProgrammingLanguage(Base):
    __tablename__ = "programming_languages"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)

    job_description_programming_languages = relationship(
        "JobDescriptionProgrammingLanguage",
        back_populates="programming_language"
    )