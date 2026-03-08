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


def calculate_top_expenses(transactions, limit: int = 5):
    expenses = {}

    for t in transactions:
        if _normalize_transaction_type(t.type) != "expense":
            continue

        if _normalize_status(getattr(t, "status", None)) != "confirmed":
            continue

        if "transfer" in (t.description or "").lower():
            continue

        category_name = t.category.name if getattr(t, "category", None) else "Sem categoria"

        expenses[category_name] = expenses.get(category_name, 0) + abs(float(t.amount))

    sorted_expenses = sorted(
        expenses.items(),
        key=lambda x: x[1],
        reverse=True
    )

    total = sum(expenses.values())

    return [
        {
            "category_name": category_name,
            "total": round(amount, 2),
            "percentage": round((amount / total) * 100, 2) if total > 0 else 0,
        }
        for category_name, amount in sorted_expenses[:limit]
    ]