# app/api/v1/user_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.user_schema import UserResponse
from app.services.user_service import get_user_profile


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me", response_model=UserResponse)
def get_me(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_user_profile(
        db,
        current_user.id
    )