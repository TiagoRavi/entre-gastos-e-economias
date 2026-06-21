import os
import httpx
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.transaction import Transaction
from app.models.account import Account


N8N_WEBHOOK = os.getenv("N8N_FINANCE_ASSISTANT_WEBHOOK")


class AssistantService:
    @staticmethod
    async def handle_finance_question(db: Session, user_id: int, payload: dict):
        try:
            message = payload.get("message")
            period = payload.get("period")

            if not message:
                return {"reply": "Pergunta não enviada."}

            income_total = (
                db.query(func.coalesce(func.sum(Transaction.amount), 0))
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.type == "income",
                )
                .scalar()
            )

            expense_total = (
                db.query(func.coalesce(func.sum(Transaction.amount), 0))
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.type == "expense",
                )
                .scalar()
            )

            accounts = (
                db.query(Account)
                .filter(Account.user_id == user_id)
                .all()
            )

            accounts_data = [
                {
                    "name": account.name,
                    "balance": float(account.initial_balance or 0),
                }
                for account in accounts
            ]

            balance = float(income_total or 0) + float(expense_total or 0)

            financial_data = {
                "summary": {
                    "income_total": float(income_total or 0),
                    "expense_total": float(expense_total or 0),
                    "balance": balance,
                },
                "categories": [],
                "accounts": accounts_data,
                "user_id": user_id,
                "period": period,
            }

        except Exception as e:
            return {
                "reply": "Erro ao processar dados financeiros.",
                "debug": str(e),
            }

        if not N8N_WEBHOOK:
            return {"reply": "Webhook do n8n não configurado no backend."}

        response = None

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.post(
                    N8N_WEBHOOK,
                    json={
                        "input": message,
                        "context": {
                            "financial_data": financial_data,
                            "period": period or "all",
                        },
                    },
                )

            response.raise_for_status()

            text = response.text.strip()

            if not text:
                return {"reply": "Resposta vazia do n8n."}

            try:
                data = response.json()
                print("N8N RAW:", data)

                reply = (
                    data.get("reply")
                    or data.get("message")
                    or data.get("text")
                    or data.get("response")
                )

                if not reply:
                    try:
                        reply = (
                            data.get("output", [{}])[0]
                            .get("content", [{}])[0]
                            .get("text")
                        )
                    except Exception:
                        reply = None

                if isinstance(reply, (dict, list)):
                    reply = str(reply)

                if not reply:
                    reply = text or "Resposta vazia do n8n."

                return {"reply": reply}

            except Exception:
                return {"reply": text}

        except Exception as e:
            return {
                "reply": "Falha ao chamar n8n.",
                "debug": {
                    "status": response.status_code if response else None,
                    "text": response.text if response else None,
                    "error": str(e),
                },
            }