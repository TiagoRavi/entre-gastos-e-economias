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


def calculate_top_incomes(transactions, limit: int = 5):
    grouped = {}

    for t in transactions:
        if _normalize_transaction_type(t.type) != "income":
            continue

        if _normalize_status(getattr(t, "status", None)) != "confirmed":
            continue

        if float(t.amount) <= 0:
            continue

        category_name = t.category.name if getattr(t, "category", None) else "Sem categoria"

        grouped[category_name] = grouped.get(category_name, 0) + float(t.amount)

    total = sum(grouped.values())

    result = [
        {
            "category_name": category_name,
            "total": round(amount, 2),
            "percentage": round((amount / total) * 100, 2) if total > 0 else 0,
        }
        for category_name, amount in grouped.items()
    ]

    result.sort(key=lambda x: x["total"], reverse=True)

    return result[:limit]