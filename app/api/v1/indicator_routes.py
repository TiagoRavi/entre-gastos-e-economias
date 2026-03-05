from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user

from app.services.indicator_service import (
    get_balance_indicator,
    get_expense_indicator,
    get_savings_indicator,
    get_projection_indicator,
    get_monthly_cashflow_indicator
)

router = APIRouter(
    prefix="/indicators",
    tags=["Indicators"]
)


@router.get("/balance")
def get_balance(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_balance_indicator(db, current_user.id)


@router.get("/expenses-by-category")
def get_expenses_by_category(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_expense_indicator(db, current_user.id)


@router.get("/savings-rate")
def get_savings_rate(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_savings_indicator(db, current_user.id)


@router.get("/projection")
def get_projection(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_projection_indicator(db, current_user.id)


@router.get("/monthly-cashflow")
def monthly_cashflow(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return get_monthly_cashflow_indicator(db, user.id)