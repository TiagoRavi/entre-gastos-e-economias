# app/services/budget_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.budget_repository import (
    create_budget,
    get_budgets_by_user,
    get_budget_by_category,
    delete_budget
)

from app.repositories.category_repository import get_category_by_id


def create_user_budget(
    db: Session,
    user_id: int,
    category_id: int,
    monthly_limit: float
):

    category = get_category_by_id(db, category_id)

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

    budget = create_budget(
        db=db,
        user_id=user_id,
        category_id=category_id,
        monthly_limit=monthly_limit
    )

    return budget


def list_user_budgets(
    db: Session,
    user_id: int
):

    budgets = get_budgets_by_user(
        db,
        user_id
    )

    return budgets


def remove_user_budget(
    db: Session,
    user_id: int,
    budget_id: int
):

    budgets = get_budgets_by_user(
        db,
        user_id
    )

    budget = next(
        (b for b in budgets if b.id == budget_id),
        None
    )

    if not budget:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Budget not found"
        )

    delete_budget(
        db,
        budget_id
    )

    return {"message": "Budget deleted"}


def check_category_budget(
    db: Session,
    user_id: int,
    category_id: int
):

    budget = get_budget_by_category(
        db,
        user_id,
        category_id
    )

    return budget