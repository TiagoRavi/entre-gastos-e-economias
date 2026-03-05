# app/models/category.py

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class Category(BaseModel):
    __tablename__ = "categories"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    name = Column(
        String(255),
        nullable=False
    )

    type = Column(
        String(50),
        nullable=False
    )

    # Relationships
    user = relationship(
        "User",
        back_populates="categories"
    )

    transactions = relationship(
        "Transaction",
        back_populates="category",
        cascade="all, delete-orphan"
    )

    budgets = relationship(
        "Budget",
        back_populates="category",
        cascade="all, delete-orphan"
    )