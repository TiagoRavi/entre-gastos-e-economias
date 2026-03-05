# app/api/v1/account_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.account_schema import AccountCreate, AccountResponse
from app.services.account_service import (
    create_user_account,
    list_user_accounts,
    remove_user_account
)


router = APIRouter(
    prefix="/accounts",
    tags=["Accounts"]
)


@router.post("/", response_model=AccountResponse)
def create_account(
    account_data: AccountCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return create_user_account(
        db=db,
        user_id=current_user.id,
        name=account_data.name,
        type=account_data.type,
        initial_balance=account_data.initial_balance
    )


@router.get("/", response_model=list[AccountResponse])
def list_accounts(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return list_user_accounts(
        db,
        current_user.id
    )


@router.delete("/{account_id}")
def delete_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return remove_user_account(
        db,
        current_user.id,
        account_id
    )