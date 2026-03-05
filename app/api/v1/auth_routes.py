# app/api/v1/auth_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.services.auth_service import register_user, authenticate_user
from app.schemas.user_schema import UserCreate, UserLogin, UserResponse


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register", response_model=UserResponse)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    return register_user(db, user_data)


@router.post("/login")
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    return authenticate_user(db, login_data)


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user = Depends(get_current_user)
):
    return current_user