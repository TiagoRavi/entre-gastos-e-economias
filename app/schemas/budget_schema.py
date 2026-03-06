# app/schemas/budget_schema.py

from pydantic import BaseModel, field_validator
from datetime import datetime
from decimal import Decimal


# =========================
# CREATE
# =========================

class BudgetCreate(BaseModel):

    category_id: int
    monthly_limit: Decimal

    @field_validator("monthly_limit")
    @classmethod
    def validate_limit(cls, value: Decimal):

        if value <= 0:
            raise ValueError("monthly_limit must be greater than 0")

        return value


# =========================
# RESPONSE (CRUD)
# =========================

class BudgetResponse(BaseModel):

    id: int
    category_id: int
    category_name: str
    monthly_limit: Decimal
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


# =========================
# DASHBOARD / BUDGET STATUS
# =========================

class BudgetSummary(BaseModel):

    category_id: int
    category_name: str

    monthly_limit: Decimal
    spent: Decimal
    remaining: Decimal

    percentage: float

    model_config = {
        "from_attributes": True
    }