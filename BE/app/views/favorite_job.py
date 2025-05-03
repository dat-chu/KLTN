from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.helper import get_current_user_id
from app.database.get_db import get_db
from app.model.favorite_job import FavoriteJob
from typing import List
from app.schema.favorite_job_schema import FavoriteJobResponse

router = APIRouter(prefix="/favorite-jobs", tags=["Favorire Job"])


@router.post("/create/{job_description_id}", response_model=FavoriteJobResponse)
def create_favorite_job(job_description_id: int, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    db_favorite_job = FavoriteJob(user_id=current_user_id, job_description_id=job_description_id)
    db.add(db_favorite_job)
    db.commit()
    db.refresh(db_favorite_job)
    return db_favorite_job

@router.delete("/{job_description_id}")
def delete_favorite_job(job_description_id: int, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    db_favorite_job = db.query(FavoriteJob).filter(FavoriteJob.user_id == current_user_id, FavoriteJob.job_description_id == job_description_id).first()
    if not db_favorite_job:
        raise HTTPException(status_code=404, detail="Favorite Job not found")
    db.delete(db_favorite_job)
    db.commit()
    return db_favorite_job

@router.get("/", response_model=List[FavoriteJobResponse])
def get_favorite_jobs(current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    favorite_jobs = db.query(FavoriteJob).filter(FavoriteJob.user_id == current_user_id).all()
    return favorite_jobs
