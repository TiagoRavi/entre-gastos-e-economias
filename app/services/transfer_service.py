from sqlalchemy.orm import Session
from decimal import Decimal

from app.models.transaction import Transaction


class TransferService:

    @staticmethod
    def transfer(
        db: Session,
        user_id: int,
        from_account_id: int,
        to_account_id: int,
        amount: Decimal,
        date,
        description: str | None = None
    ):

        if from_account_id == to_account_id:
            raise ValueError("Cannot transfer to the same account")

        if amount <= 0:
            raise ValueError("Transfer amount must be positive")

        # Débito conta origem
        debit_transaction = Transaction(
            user_id=user_id,
            account_id=from_account_id,
            type="expense",
            amount=-amount,
            description=description or "Transfer out",
            date=date,
            category_id=None
        )

        # Crédito conta destino
        credit_transaction = Transaction(
            user_id=user_id,
            account_id=to_account_id,
            type="income",
            amount=amount,
            description=description or "Transfer in",
            date=date,
            category_id=None
        )

        db.add(debit_transaction)
        db.add(credit_transaction)

        db.commit()

        return {
            "from_transaction": debit_transaction,
            "to_transaction": credit_transaction
        }