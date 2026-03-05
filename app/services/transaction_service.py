# app/services/transaction_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

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
    type: str,
    amount: float,
    description: str | None,
    date
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

    transaction = create_transaction(
        db=db,
        user_id=user_id,
        account_id=account_id,
        category_id=category_id,
        type=type,
        amount=amount,
        description=description,
        date=date
    )

    return transaction


def list_user_transactions(
    db: Session,
    user_id: int
):

    result = get_transactions_by_user(
        db,
        user_id
    )

    return result["items"]


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