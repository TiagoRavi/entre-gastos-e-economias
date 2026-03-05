# app/models/budget.py

from sqlalchemy import Column, Integer, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class Budget(BaseModel):
    __tablename__ = "budgets"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "category_id",
            name="uq_user_category_budget"
        ),
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=False,
        index=True
    )

    monthly_limit = Column(
        Numeric(12, 2),
        nullable=False
    )

    # Relationships

    user = relationship(
        "User",
        back_populates="budgets"
    )

    category = relationship(
        "Category",
        back_populates="budgets"
    )