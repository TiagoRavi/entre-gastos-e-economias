from collections import defaultdict


def _normalize_transaction_type(value) -> str:
    if value is None:
        return ""

    if hasattr(value, "value"):
        value = value.value

    return str(value).strip().lower()


def _normalize_status(value) -> str:
    if value is None:
        return ""

    if hasattr(value, "value"):
        value = value.value

    return str(value).strip().lower()


def calculate_monthly_cashflow(transactions, month=None):
    monthly = defaultdict(lambda: {"income": 0.0, "expense": 0.0})

    for t in transactions:
        if _normalize_status(getattr(t, "status", None)) != "confirmed":
            continue

        if "transfer" in (t.description or "").lower():
            continue

        key = f"{t.date.year}-{t.date.month:02d}"
        tx_type = _normalize_transaction_type(t.type)
        amount = float(t.amount)

        if tx_type == "income":
            monthly[key]["income"] += amount

        elif tx_type == "expense":
            monthly[key]["expense"] += abs(amount)

    items = [
        {
            "month": key,
            "income": round(values["income"], 2),
            "expense": round(values["expense"], 2),
        }
        for key, values in sorted(monthly.items())
    ]

    # filtro opcional por mês específico
    if month:
        items = [item for item in items if item["month"] == month]

    # garante mês zerado se não houver transação
    if month and not items:
        items = [{
            "month": month,
            "income": 0,
            "expense": 0
        }]

    return items