# app/services/budget_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.budget_repository import (
    create_budget,
    get_budgets_by_user,
    get_budget_by_category,
    delete_budget,
    get_budget_by_id,
    get_budget_summary_by_user
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

    # 🔹 evita orçamento duplicado
    existing_budget = get_budget_by_category(
        db,
        user_id,
        category_id
    )

    if existing_budget:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Budget already exists for this category"
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

    return get_budgets_by_user(
        db,
        user_id
    )


def remove_user_budget(
    db: Session,
    user_id: int,
    budget_id: int
):

    budget = get_budget_by_id(
        db,
        budget_id
    )

    if not budget:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Budget not found"
        )

    if budget.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
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

    if not budget:
        return None

    return budget.monthly_limit


# =========================
# BUDGET SUMMARY (DASHBOARD)
# =========================

def get_user_budget_summary(
    db: Session,
    user_id: int
):

    return get_budget_summary_by_user(
        db,
        user_id
    )