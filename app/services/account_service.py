# app/services/account_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.repositories.account_repository import (
    create_account,
    get_accounts_by_user,
    get_account_by_id,
    delete_account
)


def create_user_account(
    db: Session,
    user_id: int,
    name: str,
    type: str,
    initial_balance: float
):

    account = create_account(
        db=db,
        user_id=user_id,
        name=name,
        type=type,
        initial_balance=initial_balance
    )

    return account


def list_user_accounts(db: Session, user_id: int):

    accounts = get_accounts_by_user(db, user_id)

    return accounts


def remove_user_account(
    db: Session,
    user_id: int,
    account_id: int
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

    delete_account(db, account_id)

    return {"message": "Account deleted"}