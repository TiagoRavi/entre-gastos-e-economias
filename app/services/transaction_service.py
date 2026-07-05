from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import date
from math import ceil

from app.schemas.enums import TransactionType

from app.repositories.transaction_repository import (
    create_transaction,
    get_transactions_by_user,
    get_transaction_by_id,
    delete_transaction
)

from app.repositories.account_repository import get_account_by_id
from app.repositories.category_repository import get_category_by_id


def create_user_transaction(
    db: Session,
    user_id: int,
    account_id: int,
    category_id: int | None,
    type: TransactionType,
    amount: float,
    description: str | None,
    date: date,
    status: str = "pending"
):

    account = get_account_by_id(db, account_id)

    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )

    if account.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )

    if category_id:

        category = get_category_by_id(db, category_id)

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found"
            )

        if category.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized"
            )

    if type == TransactionType.income and amount < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Income must be positive"
        )

    if type == TransactionType.expense and amount > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Expense must be negative"
        )

    transaction = create_transaction(
        db=db,
        user_id=user_id,
        account_id=account_id,
        category_id=category_id,
        type=type.value,
        amount=amount,
        description=description,
        date=date,
        status=status
    )

    return transaction


from datetime import date
from typing import Optional

from math import ceil

def list_user_transactions(
    db: Session,
    user_id: int,
    page: int,
    limit: int,
    transaction_type: Optional[str] = None,
    category_id: Optional[int] = None,
    account_id: Optional[int] = None,
    status: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
):
    result = get_transactions_by_user(
        db=db,
        user_id=user_id,
        page=page,
        limit=limit,
        transaction_type=transaction_type,
        category_id=category_id,
        account_id=account_id,
        status=status,
        start_date=start_date,
        end_date=end_date,
    )

    total = result["total"]
    pages = ceil(total / limit) if total > 0 else 1

    return {
        "page": result["page"],
        "limit": result["limit"],
        "total": total,
        "pages": pages,
        "items": result["items"],
    }

def confirm_user_transaction(
    db: Session,
    user_id: int,
    transaction_id: int
):

    transaction = get_transaction_by_id(
        db,
        transaction_id
    )

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    if transaction.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )

    transaction.status = "confirmed"

    db.commit()
    db.refresh(transaction)

    return transaction


def remove_user_transaction(
    db: Session,
    user_id: int,
    transaction_id: int
):

    transaction = get_transaction_by_id(
        db,
        transaction_id
    )

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )

    if transaction.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )

    delete_transaction(
        db,
        transaction_id
    )

    return {"message": "Transaction deleted"}