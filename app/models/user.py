# app/models/user.py

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    name = Column(String(255), nullable=False)

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    # Relacionamentos
    accounts = relationship("Account", back_populates="user", cascade="all, delete")

    categories = relationship("Category", back_populates="user", cascade="all, delete")

    transactions = relationship("Transaction", back_populates="user", cascade="all, delete")

    budgets = relationship("Budget", back_populates="user", cascade="all, delete")