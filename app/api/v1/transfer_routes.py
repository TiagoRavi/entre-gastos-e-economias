from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.transfer_schema import TransferCreate
from app.services.transfer_service import TransferService
from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/transfers",
    tags=["Transfers"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Transfer between accounts"
)
def create_transfer(
    data: TransferCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        return TransferService.transfer(
            db=db,
            user_id=current_user.id,
            from_account_id=data.from_account_id,
            to_account_id=data.to_account_id,
            amount=data.amount,
            date=data.date,
            description=data.description
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )