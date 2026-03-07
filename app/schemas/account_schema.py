# app/schemas/account_schema.py

from pydantic import BaseModel
from datetime import datetime


class AccountCreate(BaseModel):
    name: str
    type: str
    initial_balance: float = 0


class AccountResponse(BaseModel):
    id: int
    name: str
    type: str
    initial_balance: float
    balance: float = 0
    created_at: datetime

    class Config:
        from_attributes = True