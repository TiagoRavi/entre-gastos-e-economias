from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.models.category import Category


def calculate_top_incomes(transactions, limit: int = 5):
    incomes = [
        t for t in transactions
        if t.type == "income"
        and float(t.amount) > 0
        and t.category is not None
    ]

    grouped = {}

    for transaction in incomes:
        category_name = transaction.category.name

        grouped[category_name] = grouped.get(category_name, 0) + float(transaction.amount)

    result = [
        {
            "category": category,
            "amount": amount
        }
        for category, amount in grouped.items()
    ]

    result.sort(key=lambda x: x["amount"], reverse=True)

    return result[:limit]