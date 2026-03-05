# app/schemas/budget_schema.py

from pydantic import BaseModel, field_validator
from datetime import datetime


class BudgetCreate(BaseModel):

    category_id: int
    monthly_limit: float

    @field_validator("monthly_limit")
    @classmethod
    def validate_limit(cls, value: float):

        if value <= 0:
            raise ValueError("monthly_limit must be greater than 0")

        return value


class BudgetResponse(BaseModel):

    id: int
    category_id: int
    monthly_limit: float
    created_at: datetime

    model_config = {
        "from_attributes": True
    }