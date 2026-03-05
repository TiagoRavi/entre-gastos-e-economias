from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user

from app.schemas.transaction_schema import (
    TransactionCreate,
    TransactionResponse,
    TransactionListResponse
)

from app.services.transaction_service import (
    create_user_transaction,
    list_user_transactions,
    remove_user_transaction,
    confirm_user_transaction
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
        date=transaction_data.date,
        status=transaction_data.status
    )


@router.get("/", response_model=TransactionListResponse)
def list_transactions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return list_user_transactions(
        db=db,
        user_id=current_user.id,
        page=page,
        limit=limit
    )


@router.patch("/{transaction_id}/confirm", response_model=TransactionResponse)
def confirm_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return confirm_user_transaction(
        db,
        current_user.id,
        transaction_id
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