from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.get_db import get_db
from app.model.programming_language import ProgrammingLanguage
from typing import List
from app.schema.programming_language_schema import ProgrammingLanguageResponse, ProgrammingLanguageUpdate, ProgrammingLanguageCreation

router = APIRouter(prefix="/programming-languages", tags=["Programming Language"])

@router.get("/", response_model=List[ProgrammingLanguageResponse])
def get_PLangs (db: Session = Depends(get_db)):
    Plangs = db.query(ProgrammingLanguage).all()
    return Plangs


@router.get("/{id}", response_model=ProgrammingLanguageResponse)
def getPLangById(id: int, db: Session = Depends(get_db)):
    Plang = db.query(ProgrammingLanguage).filter(ProgrammingLanguage.id == id).first()
    if not Plang:
        raise HTTPException(status_code=404, detail="Programming Language not found")
    return Plang


@router.post("/", response_model=ProgrammingLanguageResponse)
def create_PLang(Plang: ProgrammingLanguageCreation, db: Session = Depends(get_db)):
    existing = db.query(ProgrammingLanguage).filter_by(name=Plang.name).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail=f"Programming Language with name '{Plang.name}' already exists."
        )

    db_Plang = ProgrammingLanguage(**Plang.dict())
    db.add(db_Plang)
    db.commit()
    db.refresh(db_Plang)
    return db_Plang


@router.put("/{id}", response_model=ProgrammingLanguageResponse)
def update_PLang(id: int, Plang: ProgrammingLanguageUpdate, db: Session = Depends(get_db)):
    dbPlang = db.query(ProgrammingLanguage).filter(ProgrammingLanguage.id == id).first()
    if not dbPlang:
        raise HTTPException(status_code=404, detail="Programming Language not found")
    dbPlang.name = Plang.name
    db.commit()
    db.refresh(dbPlang)
    return dbPlang


@router.delete("/{id}")
def delete_PLang(id: int, db: Session = Depends(get_db)):
    dbPlang = db.query(ProgrammingLanguage).filter(ProgrammingLanguage.id == id).first()
    if not dbPlang:
        raise HTTPException(status_code=404, detail="Programming Language not found")
    db.delete(dbPlang)
    db.commit()
    return dbPlang