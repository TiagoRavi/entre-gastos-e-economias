# app/services/account_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from sqlalchemy import func
from app.models.transaction import Transaction

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

    result = []

    for account in accounts:

        income = db.query(
            func.coalesce(func.sum(Transaction.amount), 0)
        ).filter(
            Transaction.account_id == account.id,
            Transaction.type == "income"
        ).scalar()

        expense = db.query(
            func.coalesce(func.sum(Transaction.amount), 0)
        ).filter(
            Transaction.account_id == account.id,
            Transaction.type == "expense"
        ).scalar()

        balance = account.initial_balance + income + expense

        account.balance = balance

        result.append(account)

    return result

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