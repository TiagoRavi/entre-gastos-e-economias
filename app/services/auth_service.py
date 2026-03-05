# app/services/auth_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.user_repository import (
    create_user,
    get_user_by_email
)

from app.schemas.user_schema import UserCreate, UserLogin
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token
)


def register_user(db: Session, user_data: UserCreate):

    existing_user = get_user_by_email(db, user_data.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    password_hash = get_password_hash(user_data.password)

    user = create_user(
        db=db,
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash
    )

    return user


def authenticate_user(db: Session, login_data: UserLogin):

    user = get_user_by_email(db, login_data.email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    if not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }