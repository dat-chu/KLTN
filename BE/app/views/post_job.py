from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload
from app.model.favorite_job import FavoriteJob
from app.model.job_description_programming_language import JobDescriptionProgrammingLanguage
from app.model.programming_language import ProgrammingLanguage
from app.helper import get_current_user_id
from app.database.get_db import get_db
from app.schema.post_job_schema import JobPaginationResponse, PostJobResponse, PostJobCreation
from app.model.job_description import JobDescription

router = APIRouter(prefix="/job-descriptions", tags=["Job Description"])


@router.get("/", response_model=JobPaginationResponse)
def get_job_descriptions(
    level: str = Query(default=None),
    status: str = Query(default=None),
    search: str = Query(default=""),
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    query = db.query(JobDescription)

    if level:
        query = query.filter(JobDescription.level.ilike(f"%{level}%"))
    if status:
        query = query.filter(JobDescription.status.ilike(f"%{status}%"))
    if search:
        query = query.filter(or_(
            JobDescription.title.ilike(f"%{search}%"),
            JobDescription.description.ilike(f"%{search}%")
        ))

    total = query.count()

    # Add programming languages
    jobs = query.options(
        joinedload(JobDescription.job_description_programming_languages)
        .joinedload(JobDescriptionProgrammingLanguage.programming_language)
    ).order_by(JobDescription.created_at.desc()).offset(skip).limit(limit).all()
    
    # get programming languages array object {id, name}
    for job in jobs:
        programming_languages = [
            {"id": pl.programming_language.id, "name": pl.programming_language.name} 
                for pl in job.job_description_programming_languages
        ]
        job.programming_languages = programming_languages

    
    return {"total": total, "jobs": jobs}


# get job description by favorite job
@router.get("/favorite-jobs", response_model=JobPaginationResponse)
def get_job_description_by_favorite_job(
    level: str = Query(default=None),
    status: str = Query(default=None),
    search: str = Query(default=""),
    skip: int = 0,
    limit: int = 10,
    current_user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    query = db.query(JobDescription).filter(
        JobDescription.id.in_(db.query(
            FavoriteJob.job_description_id).filter(
                FavoriteJob.user_id == current_user_id
                )
            )
        )

    if level:
        query = query.filter(JobDescription.level.ilike(f"%{level}%"))
    if status:
        query = query.filter(JobDescription.status.ilike(f"%{status}%"))
    if search:
        query = query.filter(or_(
            JobDescription.title.ilike(f"%{search}%"),
            JobDescription.description.ilike(f"%{search}%")
        ))

    total = query.count()

    # Add programming languages
    jobs = query.options(
        joinedload(JobDescription.job_description_programming_languages)
        .joinedload(JobDescriptionProgrammingLanguage.programming_language)
    ).order_by(JobDescription.created_at.desc()).offset(skip).limit(limit).all()
    
    # get programming languages array object {id, name}
    for job in jobs:
        programming_languages = [{"id": pl.programming_language.id, "name": pl.programming_language.name} for pl in job.job_description_programming_languages]
        job.programming_languages = programming_languages

    
    return {"total": total, "jobs": jobs}
    
    
@router.get("/created_by", response_model=JobPaginationResponse)
def get_job_description_by_created_user(
    level: str = Query(default=None),
    status: str = Query(default=None),
    search: str = Query(default=""),
    skip: int = 0,
    limit: int = 10,
    current_user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    query = db.query(JobDescription).filter(JobDescription.created_by == current_user_id)

    if level:
        query = query.filter(JobDescription.level.ilike(f"%{level}%"))
    if status:
        query = query.filter(JobDescription.status.ilike(f"%{status}%"))
    if search:
        query = query.filter(or_(
            JobDescription.title.ilike(f"%{search}%"),
            JobDescription.description.ilike(f"%{search}%")
        ))

    total = query.count()

    # Add programming languages
    jobs = query.options(
        joinedload(JobDescription.job_description_programming_languages)
        .joinedload(JobDescriptionProgrammingLanguage.programming_language)
    ).order_by(JobDescription.created_at.desc()).offset(skip).limit(limit).all()
    
    # get programming languages array object {id, name}
    for job in jobs:
        programming_languages = [{"id": pl.programming_language.id, "name": pl.programming_language.name} for pl in job.job_description_programming_languages]
        job.programming_languages = programming_languages
    
    return {"total": total, "jobs": jobs}
    

@router.get("/{id}", response_model=PostJobResponse)
def get_job_description_by_id(id: int, db: Session = Depends(get_db)):
    job_description = db.query(JobDescription).filter(JobDescription.id == id).first()
    if not job_description:
        raise HTTPException(status_code=404, detail="Job Description not found")
    
    # get programming languages array object {id, name}
    programming_languages = [{"id": pl.programming_language.id, "name": pl.programming_language.name} for pl in job_description.job_description_programming_languages]
    job_description.programming_languages = programming_languages
    return job_description


@router.post("/", response_model=PostJobResponse)
def create_job_description(job_description: PostJobCreation, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    try:
        programming_languages = db.query(ProgrammingLanguage).filter(
            ProgrammingLanguage.id.in_(job_description.programmingLanguages)
        ).all()

        if len(programming_languages) != len(job_description.programmingLanguages):
            raise HTTPException(status_code=400, detail="One or more programming language IDs are invalid.")
        
        post_job_modified = {
            "created_by": current_user_id,
            "job_position_id": job_description.position,
            "title": job_description.title,
            "description": job_description.description,
            "experience_year": job_description.experience,
            "level": job_description.level,
            "working_type": job_description.workingType,
            "contract_type": job_description.contractType,
            "salary_min": job_description.salaryMin,
            "salary_max": job_description.salaryMax,
            "status": job_description.status,
            "end_date": job_description.endDate
        }
        db_job_description = JobDescription(**post_job_modified)
        
        db.add(db_job_description)
        db.flush()
        
        for pl_id in job_description.programmingLanguages:
            db.add(JobDescriptionProgrammingLanguage(
                job_description_id=db_job_description.id,
                programming_language_id=pl_id
            ))
        
        db.commit()
        db.refresh(db_job_description)
        return db_job_description
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{id}", response_model=PostJobResponse)
def update_job_description(id: int, job_description: PostJobCreation, db: Session = Depends(get_db)):
    db_job_description = db.query(JobDescription).filter(JobDescription.id == id).first()
    if not db_job_description:
        raise HTTPException(status_code=404, detail="Job Description not found")
    
    db_job_description.job_position_id = job_description.position
    db_job_description.title = job_description.title
    db_job_description.description = job_description.description
    db_job_description.experience_year = job_description.experience
    db_job_description.level = job_description.level
    db_job_description.working_type = job_description.workingType
    db_job_description.contract_type = job_description.contractType
    db_job_description.salary_min = job_description.salaryMin
    db_job_description.salary_max = job_description.salaryMax
    db_job_description.status = job_description.status
    db_job_description.end_date = job_description.endDate
    
    current_languages = db.query(JobDescriptionProgrammingLanguage).filter(
        JobDescriptionProgrammingLanguage.job_description_id == db_job_description.id
    ).all()

    new_programming_languages = job_description.programmingLanguages

    current_language_ids = [pl.programming_language_id for pl in current_languages]
    languages_to_add = [pl_id for pl_id in new_programming_languages if pl_id not in current_language_ids]
    languages_to_remove = [pl for pl in current_languages if pl.programming_language_id not in new_programming_languages]

    for pl_id in languages_to_add:
        db.add(JobDescriptionProgrammingLanguage(
            job_description_id=db_job_description.id,
            programming_language_id=pl_id
        ))

    for pl in languages_to_remove:
        db.delete(pl)

    db.commit()
    db.refresh(db_job_description)

    return db_job_description


@router.delete("/{id}")
def delete_job_description(id: int, db: Session = Depends(get_db)):
    db_job_description = db.query(JobDescription).filter(JobDescription.id == id).first()
    if not db_job_description:
        raise HTTPException(status_code=404, detail="Job Description not found")
    db.delete(db_job_description)
    db.commit()
    return db_job_description
