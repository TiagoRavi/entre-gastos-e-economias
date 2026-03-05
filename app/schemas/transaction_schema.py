# app/schemas/transaction_schema.py

from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class TransactionCreate(BaseModel):
    account_id: int
    category_id: Optional[int] = None
    type: str
    amount: float
    description: Optional[str] = None
    date: date


class TransactionResponse(BaseModel):
    id: int
    account_id: int
    category_id: Optional[int]
    type: str
    amount: float
    description: Optional[str]
    date: date
    created_at: datetime

    class Config:
        from_attributes = True