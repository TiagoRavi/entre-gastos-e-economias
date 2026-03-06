from pydantic import BaseModel
from decimal import Decimal
from datetime import date
from typing import Optional


class TransferCreate(BaseModel):
    from_account_id: int
    to_account_id: int
    amount: Decimal
    description: Optional[str] = None
    date: date