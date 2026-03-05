# app/services/user_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.user_repository import (
    get_user_by_id
)


def get_user_profile(db: Session, user_id: int):

    user = get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user