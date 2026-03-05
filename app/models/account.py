# app/models/account.py

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import BaseModel


class Account(BaseModel):
    __tablename__ = "accounts"

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

    initial_balance = Column(
        Integer,
        default=0
    )

    # Relationships
    user = relationship(
        "User",
        back_populates="accounts"
    )

    transactions = relationship(
        "Transaction",
        back_populates="account",
        cascade="all, delete-orphan"
    )