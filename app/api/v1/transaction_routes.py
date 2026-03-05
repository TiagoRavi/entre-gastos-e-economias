# app/api/v1/transaction_routes.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.schemas.transaction_schema import (
    TransactionCreate,
    TransactionResponse
)

from app.services.transaction_service import (
    create_user_transaction,
    list_user_transactions,
    remove_user_transaction
)


router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)


@router.post("/", response_model=TransactionResponse)
def create_transaction(
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return create_user_transaction(
        db=db,
        user_id=current_user.id,
        account_id=transaction_data.account_id,
        category_id=transaction_data.category_id,
        type=transaction_data.type,
        amount=transaction_data.amount,
        description=transaction_data.description,
        date=transaction_data.date
    )


@router.get("/", response_model=list[TransactionResponse])
def list_transactions(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return list_user_transactions(
        db,
        current_user.id
    )


@router.delete("/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return remove_user_transaction(
        db,
        current_user.id,
        transaction_id
    )