# app/services/category_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.category_repository import (
    create_category,
    get_categories_by_user,
    get_category_by_id,
    delete_category
)


def create_user_category(
    db: Session,
    user_id: int,
    name: str,
    type: str
):

    category = create_category(
        db=db,
        user_id=user_id,
        name=name,
        type=type
    )

    return category


def list_user_categories(
    db: Session,
    user_id: int
):

    categories = get_categories_by_user(
        db,
        user_id
    )

    return categories


def remove_user_category(
    db: Session,
    user_id: int,
    category_id: int
):

    category = get_category_by_id(
        db,
        category_id
    )

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )

    delete_category(
        db,
        category_id
    )

    return {"message": "Category deleted"}