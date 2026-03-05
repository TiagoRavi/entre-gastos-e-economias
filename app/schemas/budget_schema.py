# app/schemas/budget_schema.py

from pydantic import BaseModel
from datetime import datetime


class BudgetCreate(BaseModel):
    category_id: int
    monthly_limit: float


class BudgetResponse(BaseModel):
    id: int
    category_id: int
    monthly_limit: float
    created_at: datetime

    class Config:
        from_attributes = True