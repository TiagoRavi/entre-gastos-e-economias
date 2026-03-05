from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional

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
    period: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_balance_indicator(
        db,
        current_user.id,
        period=period,
        month=month
    )


@router.get("/expenses-by-category")
def get_expenses_by_category(
    period: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_expense_indicator(
        db,
        current_user.id,
        period=period,
        month=month
    )


@router.get("/savings-rate")
def get_savings_rate(
    period: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_savings_indicator(
        db,
        current_user.id,
        period=period,
        month=month
    )


@router.get("/projection")
def get_projection(
    period: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_projection_indicator(
        db,
        current_user.id,
        period=period,
        month=month
    )


@router.get("/monthly-cashflow")
def monthly_cashflow(
    period: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return get_monthly_cashflow_indicator(
        db,
        user.id,
        period=period,
        month=month
    )