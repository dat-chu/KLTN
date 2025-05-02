from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.get_db import get_db
from app.model.job_position import JobPosition
from typing import List
from app.schema.job_position_schema import JobPositionResponse, JobPositionRequest

router = APIRouter(prefix="/job-positions", tags=["Job Position"])

@router.get("/", response_model=List[JobPositionResponse])
def get_job_position (db: Session = Depends(get_db)):
    job_positions = db.query(JobPosition).all()
    return job_positions


@router.get("/{id}", response_model=JobPositionResponse)
def get_job_position_by_id(id: int, db: Session = Depends(get_db)):
    job_position = db.query(JobPosition).filter(JobPosition.id == id).first()
    if not job_position:
        return {"message": "Job Position not found"}
    return job_position


@router.post("/", response_model=JobPositionResponse)
def create_job_position(job_position: JobPositionRequest, db: Session = Depends(get_db)):
    existing = db.query(JobPosition).filter_by(name=job_position.name).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Job position with name '{job_position.name}' already exists."
        )

    db_job_position = JobPosition(**job_position.dict())
    db.add(db_job_position)
    db.commit()
    db.refresh(db_job_position)
    return db_job_position



@router.put("/{id}", response_model=JobPositionResponse)
def update_job_position(id: int, job_position: JobPositionRequest, db: Session = Depends(get_db)):
    db_job_position = db.query(JobPosition).filter(JobPosition.id == id).first()
    if not db_job_position:
        return {"message": "Job Position not found"}
    db_job_position.name = job_position.name
    db.commit()
    db.refresh(db_job_position)
    return db_job_position


@router.delete("/{id}")
def delete_job_position(id: int, db: Session = Depends(get_db)):
    db_job_position = db.query(JobPosition).filter(JobPosition.id == id).first()
    if not db_job_position:
        return {"message": "Job Position not found"}
    db.delete(db_job_position)
    db.commit()
    return db_job_position
