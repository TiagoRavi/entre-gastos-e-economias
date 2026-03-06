from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func

from app.models.budget import Budget
from app.models.category import Category
from app.models.transaction import Transaction


def create_budget(
    db: Session,
    user_id: int,
    category_id: int,
    monthly_limit
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
        .options(joinedload(Budget.category))
        .filter(Budget.user_id == user_id)
        .all()
    )


def get_budget_by_id(
    db: Session,
    budget_id: int
):

    return (
        db.query(Budget)
        .options(joinedload(Budget.category))
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


# =========================
# BUDGET SUMMARY (DASHBOARD)
# =========================

def get_budget_summary_by_user(
    db: Session,
    user_id: int
):

    results = (
        db.query(
            Category.id.label("category_id"),
            Category.name.label("category_name"),
            Budget.monthly_limit,
            func.coalesce(func.sum(Transaction.amount), 0).label("spent")
        )
        .join(Category, Category.id == Budget.category_id)
        .outerjoin(
            Transaction,
            (Transaction.category_id == Category.id)
            & (Transaction.user_id == user_id)
        )
        .filter(Budget.user_id == user_id)
        .group_by(
            Category.id,
            Category.name,
            Budget.monthly_limit
        )
        .all()
    )

    summaries = []

    for r in results:

        spent = r.spent or 0
        remaining = r.monthly_limit - spent

        percentage = 0

        if r.monthly_limit > 0:
            percentage = float(spent / r.monthly_limit * 100)

        summaries.append({
            "category_id": r.category_id,
            "category_name": r.category_name,
            "monthly_limit": r.monthly_limit,
            "spent": spent,
            "remaining": remaining,
            "percentage": percentage
        })

    return summaries