# app/api/v1/category_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.category_schema import CategoryCreate, CategoryResponse
from app.services.category_service import (
    create_user_category,
    list_user_categories,
    remove_user_category
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/", response_model=CategoryResponse)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return create_user_category(
        db=db,
        user_id=current_user.id,
        name=category_data.name,
        type=category_data.type
    )


@router.get("/", response_model=list[CategoryResponse])
def list_categories(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return list_user_categories(
        db,
        current_user.id
    )


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return remove_user_category(
        db,
        current_user.id,
        category_id
    )