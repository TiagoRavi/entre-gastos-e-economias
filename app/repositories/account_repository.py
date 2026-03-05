# app/repositories/account_repository.py

from sqlalchemy.orm import Session

from app.models.account import Account


def create_account(
    db: Session,
    user_id: int,
    name: str,
    type: str,
    initial_balance: float = 0
) -> Account:

    account = Account(
        user_id=user_id,
        name=name,
        type=type,
        initial_balance=initial_balance
    )

    db.add(account)
    db.commit()
    db.refresh(account)

    return account


def get_accounts_by_user(db: Session, user_id: int):
    return db.query(Account).filter(Account.user_id == user_id).all()


def get_account_by_id(db: Session, account_id: int):
    return db.query(Account).filter(Account.id == account_id).first()


def delete_account(db: Session, account_id: int):

    account = db.query(Account).filter(Account.id == account_id).first()

    if not account:
        return None

    db.delete(account)
    db.commit()

    return account