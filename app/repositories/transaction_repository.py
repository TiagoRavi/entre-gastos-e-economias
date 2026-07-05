from sqlalchemy.orm import Session
from datetime import date
from typing import Optional
from sqlalchemy import func, extract
from app.models.category import Category

from app.models.transaction import Transaction
from app.schemas.enums import TransactionType
from app.utils.pagination import paginate


def create_transaction(
    db: Session,
    user_id: int,
    account_id: int,
    category_id: Optional[int],
    type: TransactionType,
    amount: float,
    description: Optional[str],
    date: date,
    status: str = "pending"
) -> Transaction:

    transaction = Transaction(
        user_id=user_id,
        account_id=account_id,
        category_id=category_id,
        type=type.value if isinstance(type, TransactionType) else type,
        amount=amount,
        description=description,
        date=date,
        status=status
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction


from datetime import date
from typing import Optional

def get_transactions_by_user(
    db: Session,
    user_id: int,
    page: int = 1,
    limit: int = 20,
    transaction_type: Optional[str] = None,
    category_id: Optional[int] = None,
    account_id: Optional[int] = None,
    status: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
):
    limit = min(limit, 100)

    query = (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
    )

    if transaction_type:
        query = query.filter(Transaction.type == transaction_type)

    if category_id:
        query = query.filter(Transaction.category_id == category_id)

    if account_id:
        query = query.filter(Transaction.account_id == account_id)

    if status:
        query = query.filter(Transaction.status == status)

    if start_date:
        query = query.filter(Transaction.date >= start_date)

    if end_date:
        query = query.filter(Transaction.date <= end_date)

    query = query.order_by(Transaction.date.desc())

    return paginate(query, page, limit)


def get_transaction_by_id(
    db: Session,
    transaction_id: int
) -> Optional[Transaction]:

    return (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id)
        .first()
    )


def confirm_transaction(
    db: Session,
    transaction_id: int
) -> Optional[Transaction]:

    transaction = get_transaction_by_id(db, transaction_id)

    if not transaction:
        return None

    transaction.status = "confirmed"

    db.commit()
    db.refresh(transaction)

    return transaction


def delete_transaction(
    db: Session,
    transaction_id: int
) -> Optional[Transaction]:

    transaction = get_transaction_by_id(db, transaction_id)

    if not transaction:
        return None

    db.delete(transaction)
    db.commit()

    return transaction


def get_all_transactions_by_user(
    db: Session,
    user_id: int
):

    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.date.desc())
        .all()
    )

def get_incomes_grouped_by_category(
    db: Session,
    user_id: int,
    year: int,
    month: int
):
    return (
        db.query(
            Category.id.label("category_id"),
            Category.name.label("category_name"),
            func.coalesce(func.sum(Transaction.amount), 0).label("total"),
        )
        .join(Category, Category.id == Transaction.category_id)
        .filter(Transaction.user_id == user_id)
        .filter(Transaction.type == TransactionType.income.value)
        .filter(extract("year", Transaction.date) == year)
        .filter(extract("month", Transaction.date) == month)
        .filter(Transaction.status == "confirmed")
        .group_by(Category.id, Category.name)
        .order_by(func.sum(Transaction.amount).desc())
        .all()
    )