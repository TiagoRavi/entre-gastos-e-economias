# app/repositories/budget_repository.py

from sqlalchemy.orm import Session
from app.models.budget import Budget


def create_budget(
    db: Session,
    user_id: int,
    category_id: int,
    monthly_limit: float
) -> Budget:

    budget = Budget(
        user_id=user_id,
        category_id=category_id,
        monthly_limit=monthly_limit
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)

    return budget


def get_budgets_by_user(
    db: Session,
    user_id: int
):

    return (
        db.query(Budget)
        .filter(Budget.user_id == user_id)
        .all()
    )


def get_budget_by_id(
    db: Session,
    budget_id: int
):

    return (
        db.query(Budget)
        .filter(Budget.id == budget_id)
        .first()
    )


def get_budget_by_category(
    db: Session,
    user_id: int,
    category_id: int
):

    return (
        db.query(Budget)
        .filter(
            Budget.user_id == user_id,
            Budget.category_id == category_id
        )
        .first()
    )


def delete_budget(
    db: Session,
    budget_id: int
):

    budget = (
        db.query(Budget)
        .filter(Budget.id == budget_id)
        .first()
    )

    if not budget:
        return None

    db.delete(budget)
    db.commit()

    return budget