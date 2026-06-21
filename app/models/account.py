from sqlalchemy import Column, String, Integer, ForeignKey, Numeric
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

    # 🔥 CORREÇÃO CRÍTICA
    # Antes era Integer → isso quebra consistência com valores monetários
    initial_balance = Column(
        Numeric(12, 2),
        default=0
    )

    # 🔗 Relationships
    user = relationship(
        "User",
        back_populates="accounts"
    )

    transactions = relationship(
        "Transaction",
        back_populates="account",
        cascade="all, delete-orphan"
    )