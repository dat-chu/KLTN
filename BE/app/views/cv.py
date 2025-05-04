import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, status
from app.helper import get_current_user_id
from app.model.cv import CV
from app.model.cv_application import CVApplication
from sqlalchemy.orm import Session
from app.database.get_db import get_db
from app.schema.cv_schema import CVs
from sqlalchemy.orm import joinedload
from imghdr import what as image_type

router = APIRouter(prefix="/cvs", tags=["CV"])

# Load environment variables
load_dotenv()

# Cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET"),
)

# Allowed image MIME types and extensions
ALLOWED_IMAGE_TYPES = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg', 
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
}

@router.post("/upload/{job_description_id}", response_model=CVs)
async def upload_image_cv(
    job_description_id: int,
    file: UploadFile = File(...),
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    try:
        # Validate file extension
        file_ext = file.filename.split('.')[-1].lower()
        if file_ext not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Only {', '.join(ALLOWED_IMAGE_TYPES.keys())} images are allowed"
            )

        # Read first 32 bytes to check file signature
        file_header = await file.read(32)
        await file.seek(0)
        
        # Verify actual image type
        detected_type = image_type(None, h=file_header)
        if not detected_type or detected_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is not a valid image"
            )

        # Validate MIME type
        if file.content_type not in ALLOWED_IMAGE_TYPES.values():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid content type. Allowed: {', '.join(ALLOWED_IMAGE_TYPES.values())}"
            )

        # Upload to Cloudinary as image
        result = cloudinary.uploader.upload(
            file.file,
            resource_type="image",
            folder="cvs",
            allowed_formats=list(ALLOWED_IMAGE_TYPES.keys()),
            quality="auto:good",  # Optimize image quality
            format=file_ext,
            secure=True
        )

        # Create CV record
        new_cv = CV(
            file_path=result["secure_url"],
            candidate_id=current_user_id,
            public_id=result.get("public_id", None)
        )
        
        db.add(new_cv)
        db.flush()
        
        # Create application record
        cv_application = CVApplication(
            candidate_id=current_user_id,
            job_description_id=job_description_id,
            cv_id=new_cv.id
        )
        db.add(cv_application)
        db.commit()
        
        return new_cv

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Image upload failed: {str(e)}"
        )

@router.get("/my-cv-applications")
def get_cv_applications(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    """
    Get all CV applications for the current user
    
    Args:
        db: Database session
        current_user_id: Authenticated user ID
    
    Returns:
        List of CV applications with related data
    
    Raises:
        HTTPException: If no applications found
    """
    try:
        cv_applications = (
            db.query(CVApplication)
            .options(
                joinedload(CVApplication.candidate),
                joinedload(CVApplication.job_description),
                joinedload(CVApplication.cv)
            )
            .filter(CVApplication.candidate_id == current_user_id)
            .order_by(CVApplication.applied_at.desc())
            .all()
        )

        if not cv_applications:
            return []

        return cv_applications
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve CV applications: {str(e)}"
        )