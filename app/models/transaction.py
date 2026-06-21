from sqlalchemy import Column, String, Integer, ForeignKey, Date, Numeric
from sqlalchemy.orm import relationship, validates

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

    # 🔒 Melhor: padronizar tipo (evita bug na query)
    type = Column(
        String(20),
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

    status = Column(
        String(20),
        nullable=False,
        default="pending"
    )

    # 🔗 Relationships

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

    # -----------------------------
    # 🔒 VALIDAÇÕES ROBUSTAS
    # -----------------------------

    @validates("type")
    def validate_type(self, key, value):
        allowed_types = {"income", "expense"}

        if value not in allowed_types:
            raise ValueError(f"Tipo inválido: {value}")

        return value

    @validates("amount")
    def validate_amount(self, key, value):
        if value is None:
            raise ValueError("Valor não pode ser nulo.")

        # ⚠️ garante que type já existe
        if hasattr(self, "type"):

            if self.type == "income" and value < 0:
                raise ValueError("Receita deve ser positiva.")

            if self.type == "expense" and value > 0:
                raise ValueError("Despesa deve ser negativa.")

        return value