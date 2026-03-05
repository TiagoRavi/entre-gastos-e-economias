from sqlalchemy.orm import Session
from datetime import date

from app.models.transaction import Transaction


def get_monthly_report(
    db: Session,
    user_id: int,
    year: int,
    month: int
):

    start_date = date(year, month, 1)

    if month == 12:
        end_date = date(year + 1, 1, 1)
    else:
        end_date = date(year, month + 1, 1)

    transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.date >= start_date,
        Transaction.date < end_date
    ).all()

    income = 0
    expenses = 0
    expenses_by_category = {}

    for t in transactions:

        if t.type == "income":
            income += t.amount

        elif t.type == "expense":
            expenses += t.amount

            category = str(t.category_id)

            if category not in expenses_by_category:
                expenses_by_category[category] = 0

            expenses_by_category[category] += t.amount

    balance = income - expenses

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance,
        "expenses_by_category": expenses_by_category
    }