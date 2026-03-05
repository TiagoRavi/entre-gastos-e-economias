from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.repositories.account_repository import get_accounts_by_user
from app.repositories.transaction_repository import get_all_transactions_by_user

from app.domain.indicators.balance_indicator import calculate_balance
from app.domain.indicators.expense_indicator import calculate_expenses_by_category
from app.domain.indicators.savings_indicator import calculate_savings_rate
from app.domain.indicators.projection_indicator import calculate_projection
from app.domain.indicators.monthly_cashflow_indicator import calculate_monthly_cashflow


def _load_transactions(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = get_all_transactions_by_user(db, user_id)

    # -------------------------
    # Filter by month (YYYY-MM)
    # -------------------------

    if month:

        year, m = month.split("-")
        year = int(year)
        m = int(m)

        return [
            t for t in transactions
            if t.date.year == year and t.date.month == m
        ]

    # -------------------------
    # Filter by period
    # -------------------------

    now = datetime.utcnow().date()

    if period == "today":
        start = now

    elif period == "7d":
        start = now - timedelta(days=7)

    elif period == "30d":
        start = now - timedelta(days=30)

    elif period == "month":
        start = now.replace(day=1)

    else:
        return transactions

    return [
        t for t in transactions
        if t.date >= start
    ]


def get_balance_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)

    return calculate_balance(transactions)


def get_expense_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)

    return calculate_expenses_by_category(transactions)


def get_savings_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)

    return calculate_savings_rate(transactions)


def get_projection_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)

    return calculate_projection(transactions)


def get_dashboard_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)
    accounts = get_accounts_by_user(db, user_id)

    now = datetime.utcnow().date()

    balance = calculate_balance(transactions)

    income_month = sum(
        t.amount for t in transactions
        if t.type == "income"
        and t.date.month == now.month
        and t.date.year == now.year
    )

    expense_month = sum(
        t.amount for t in transactions
        if t.type == "expense"
        and t.date.month == now.month
        and t.date.year == now.year
    )

    result_month = income_month - expense_month

    recent_transactions = sorted(
        transactions,
        key=lambda t: t.date,
        reverse=True
    )[:5]

    return {
        "balance": balance,
        "income_month": income_month,
        "expense_month": expense_month,
        "result_month": result_month,
        "accounts": accounts,
        "recent_transactions": recent_transactions
    }


def get_monthly_cashflow_indicator(
    db: Session,
    user_id: int,
    period: str = "30d",
    month: str | None = None
):

    transactions = _load_transactions(db, user_id, period, month)

    return calculate_monthly_cashflow(transactions, month)