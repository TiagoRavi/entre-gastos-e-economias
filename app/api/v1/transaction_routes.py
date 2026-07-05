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

from datetime import date

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
    transaction_type: str | None = Query(None),
    category_id: int | None = Query(None),
    account_id: int | None = Query(None),
    status: str | None = Query(None),
    start_date: date | None = Query(None),
    end_date: date | None = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return list_user_transactions(
        db=db,
        user_id=current_user.id,
        page=page,
        limit=limit,
        transaction_type=transaction_type,
        category_id=category_id,
        account_id=account_id,
        status=status,
        start_date=start_date,
        end_date=end_date
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