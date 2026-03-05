# app/repositories/transaction_repository.py

from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.utils.pagination import paginate


def create_transaction(
    db: Session,
    user_id: int,
    account_id: int,
    category_id: int | None,
    type: str,
    amount: float,
    description: str | None,
    date
) -> Transaction:

    transaction = Transaction(
        user_id=user_id,
        account_id=account_id,
        category_id=category_id,
        type=type,
        amount=amount,
        description=description,
        date=date
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

    query = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).order_by(Transaction.date.desc())

    return paginate(query, page, limit)


def get_transaction_by_id(db: Session, transaction_id: int):

    return db.query(Transaction).filter(
        Transaction.id == transaction_id
    ).first()


def delete_transaction(db: Session, transaction_id: int):

    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id
    ).first()

    if not transaction:
        return None

    db.delete(transaction)
    db.commit()

    return transaction