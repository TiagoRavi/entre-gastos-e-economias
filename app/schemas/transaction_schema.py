from pydantic import BaseModel, field_validator
from datetime import date, datetime
from typing import Optional, List

from app.schemas.enums import TransactionType


class TransactionCreate(BaseModel):
    account_id: int
    category_id: Optional[int] = None
    type: TransactionType
    amount: float
    description: Optional[str] = None
    date: date
    status: Optional[str] = "pending"

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, value):
        if value == 0:
            raise ValueError("Amount não pode ser 0.")
        return value


class TransactionResponse(BaseModel):
    id: int
    account_id: int
    category_id: Optional[int]
    type: TransactionType
    amount: float
    description: Optional[str]
    date: date
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class TransactionListResponse(BaseModel):
    items: List[TransactionResponse]
    pages: int