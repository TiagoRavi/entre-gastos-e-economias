from sqlalchemy.orm import Session
from datetime import date
from typing import Optional

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


def get_transactions_by_user(
    db: Session,
    user_id: int,
    page: int = 1,
    limit: int = 20
):

    limit = min(limit, 100)

    query = (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.date.desc())
    )

    # paginate já retorna items + total
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