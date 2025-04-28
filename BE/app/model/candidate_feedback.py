import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, Boolean
from app.database.base import Base
from sqlalchemy.orm import relationship

class CandidateFeedback(Base):
    __tablename__ = "candidate_feedbacks"
    
    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("users.id"))
    job_description_id = Column(Integer, ForeignKey("job_descriptions.id"))
    created_by = Column(Integer, ForeignKey("users.id"))
    status = Column(Boolean, default=False) # True for accepted, False for rejected
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    candidate = relationship("User", foreign_keys=[candidate_id], back_populates="candidate_feedbacks")
    job_description = relationship("JobDescription", back_populates="candidate_feedbacks")