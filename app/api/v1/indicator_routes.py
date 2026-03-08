from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.services.indicator_service import (
    get_balance_indicator,
    get_expense_indicator,
    get_savings_indicator,
    get_projection_indicator,
    get_monthly_cashflow_indicator,
    get_top_expenses_indicator,
    get_top_incomes_indicator,
    get_income_by_category_indicator,
)

router = APIRouter(
    prefix="/indicators",
    tags=["Indicators"]
)


@router.get("/balance")
def get_balance(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_balance_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/expenses-by-category")
def get_expenses_by_category(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_expense_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/savings-rate")
def get_savings_rate(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_savings_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/projection")
def get_projection(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_projection_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/monthly-cashflow")
def monthly_cashflow(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_monthly_cashflow_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/top-expenses")
def top_expenses(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_top_expenses_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/top-incomes")
def top_incomes(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_top_incomes_indicator(
        db,
        current_user.id,
        month=month
    )


@router.get("/income-by-category")
def income_by_category(
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_income_by_category_indicator(
        db,
        current_user.id,
        month=month
    )