# app/models/budget.py

from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class Budget(BaseModel):
    __tablename__ = "budgets"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False
    )

    monthly_limit = Column(
        Numeric(12, 2),
        nullable=False
    )

    # Relationships

    user = relationship(
        "User"
    )

    category = relationship(
        "Category"
    )