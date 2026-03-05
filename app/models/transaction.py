# app/models/transaction.py

from sqlalchemy import Column, String, Integer, ForeignKey, Date, Numeric
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class Transaction(BaseModel):
    __tablename__ = "transactions"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    account_id = Column(
        Integer,
        ForeignKey("accounts.id"),
        nullable=False
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id"),
        nullable=True
    )

    type = Column(
        String(50),
        nullable=False
    )

    amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    description = Column(
        String(255),
        nullable=True
    )

    date = Column(
        Date,
        nullable=False
    )

    # Relationships

    user = relationship(
        "User",
        back_populates="transactions"
    )

    account = relationship(
        "Account",
        back_populates="transactions"
    )

    category = relationship(
        "Category",
        back_populates="transactions"
    )