from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user

from app.schemas.budget_schema import (
    BudgetCreate,
    BudgetResponse,
    BudgetSummary
)

from app.schemas.user_schema import UserResponse

from app.services.budget_service import (
    create_user_budget,
    list_user_budgets,
    remove_user_budget,
    get_user_budget_summary
)

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)


# =========================
# CREATE BUDGET
# =========================

@router.post(
    "/",
    response_model=BudgetResponse,
    status_code=status.HTTP_201_CREATED
)
def create_budget(
    budget_data: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):

    return create_user_budget(
        db=db,
        user_id=current_user.id,
        category_id=budget_data.category_id,
        monthly_limit=budget_data.monthly_limit,
        month=budget_data.month,
        year=budget_data.year
    )

# =========================
# LIST BUDGETS
# =========================

@router.get(
    "/",
    response_model=list[BudgetResponse]
)
def list_budgets(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):

    return list_user_budgets(
        db=db,
        user_id=current_user.id
    )


# =========================
# BUDGET SUMMARY (DASHBOARD)
# =========================

@router.get(
    "/summary",
    response_model=list[BudgetSummary]
)
def budget_summary(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):

    return get_user_budget_summary(
        db=db,
        user_id=current_user.id
    )


# =========================
# DELETE BUDGET
# =========================

@router.delete(
    "/{budget_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):

    remove_user_budget(
        db=db,
        user_id=current_user.id,
        budget_id=budget_id
    )