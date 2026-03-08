from collections import defaultdict
from datetime import datetime

from sqlalchemy.orm import Session

from app.repositories.account_repository import get_accounts_by_user
from app.repositories.transaction_repository import get_all_transactions_by_user

from app.domain.indicators.balance_indicator import calculate_balance
from app.domain.indicators.expense_indicator import calculate_expenses_by_category
from app.domain.indicators.savings_indicator import calculate_savings_rate
from app.domain.indicators.projection_indicator import calculate_projection
from app.domain.indicators.monthly_cashflow_indicator import calculate_monthly_cashflow
from app.domain.indicators.top_expenses_indicator import calculate_top_expenses
from app.domain.indicators.top_incomes_indicator import calculate_top_incomes


def _resolve_month(month: str | None = None) -> tuple[int, int, str]:
    if month:
        year, m = month.split("-")
        year = int(year)
        m = int(m)
    else:
        now = datetime.utcnow().date()
        year = now.year
        m = now.month

    return year, m, f"{year}-{m:02d}"


def _normalize_status(value) -> str:
    if value is None:
        return ""

    if hasattr(value, "value"):
        value = value.value

    return str(value).strip().lower()


def _normalize_transaction_type(value) -> str:
    if value is None:
        return ""

    if hasattr(value, "value"):
        value = value.value

    return str(value).strip().lower()


def _load_all_transactions(
    db: Session,
    user_id: int
):
    return get_all_transactions_by_user(db, user_id)


def _load_monthly_transactions(
    db: Session,
    user_id: int,
    month: str | None = None
):
    transactions = get_all_transactions_by_user(db, user_id)
    year, m, _ = _resolve_month(month)

    return [
        t for t in transactions
        if t.date.year == year and t.date.month == m
    ]


def _build_summary(transactions):
    confirmed_transactions = [
        t for t in transactions
        if _normalize_status(getattr(t, "status", None)) == "confirmed"
    ]

    balance_data = calculate_balance(confirmed_transactions)

    income = float(balance_data.get("income", 0))
    expense = float(balance_data.get("expenses", 0))
    balance = float(balance_data.get("balance", 0))
    result = income - expense

    return {
        "income": round(income, 2),
        "expense": round(expense, 2),
        "result": round(result, 2),
        "balance": round(balance, 2),
    }


def _build_income_by_category(transactions):
    incomes = [
        t for t in transactions
        if _normalize_transaction_type(t.type) == "income"
        and _normalize_status(getattr(t, "status", None)) == "confirmed"
    ]

    grouped = defaultdict(float)

    for transaction in incomes:
        category_name = (
            transaction.category.name
            if getattr(transaction, "category", None)
            else "Sem categoria"
        )
        grouped[category_name] += float(transaction.amount)

    total = sum(grouped.values())

    items = [
        {
            "category_name": category_name,
            "total": round(amount, 2),
            "percentage": round((amount / total) * 100, 2) if total > 0 else 0
        }
        for category_name, amount in sorted(
            grouped.items(),
            key=lambda item: item[1],
            reverse=True
        )
    ]

    return {
        "items": items,
        "total": round(total, 2),
    }


def get_balance_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": _build_summary(monthly_transactions),
        "accumulated": _build_summary(all_transactions),
    }


def get_expense_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_expenses_by_category(monthly_transactions),
        "accumulated": calculate_expenses_by_category(all_transactions),
    }


def get_savings_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_savings_rate(monthly_transactions),
        "accumulated": calculate_savings_rate(all_transactions),
    }


def get_projection_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_projection(monthly_transactions),
        "accumulated": calculate_projection(all_transactions),
    }


def get_dashboard_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    accounts = get_accounts_by_user(db, user_id)
    _, _, ref_month = _resolve_month(month)

    recent_transactions = sorted(
        monthly_transactions,
        key=lambda t: t.date,
        reverse=True
    )[:5]

    return {
        "month": ref_month,
        "monthly": _build_summary(monthly_transactions),
        "accumulated": _build_summary(all_transactions),
        "accounts": accounts,
        "recent_transactions": recent_transactions,
    }


def get_monthly_cashflow_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_monthly_cashflow(monthly_transactions, ref_month),
        "accumulated": calculate_monthly_cashflow(all_transactions, None),
    }


def get_top_expenses_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_top_expenses(monthly_transactions),
        "accumulated": calculate_top_expenses(all_transactions),
    }


def get_top_incomes_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": calculate_top_incomes(monthly_transactions),
        "accumulated": calculate_top_incomes(all_transactions),
    }


def get_income_by_category_indicator(
    db: Session,
    user_id: int,
    month: str | None = None
):
    monthly_transactions = _load_monthly_transactions(db, user_id, month)
    all_transactions = _load_all_transactions(db, user_id)
    _, _, ref_month = _resolve_month(month)

    return {
        "month": ref_month,
        "monthly": _build_income_by_category(monthly_transactions),
        "accumulated": _build_income_by_category(all_transactions),
    }