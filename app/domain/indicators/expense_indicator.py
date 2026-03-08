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


def calculate_expenses_by_category(transactions):
    grouped = defaultdict(float)

    for transaction in transactions:
        if _normalize_transaction_type(transaction.type) != "expense":
            continue

        if _normalize_status(getattr(transaction, "status", None)) != "confirmed":
            continue

        if "transfer" in (transaction.description or "").lower():
            continue

        category_name = (
            transaction.category.name
            if getattr(transaction, "category", None)
            else "Sem categoria"
        )

        grouped[category_name] += abs(float(transaction.amount))

    total = sum(grouped.values())

    items = [
        {
            "category_name": category_name,
            "total": round(amount, 2),
            "percentage": round((amount / total) * 100, 2) if total > 0 else 0,
        }
        for category_name, amount in sorted(
            grouped.items(),
            key=lambda item: item[1],
            reverse=True
        )
    ]

    return {
        "items": items,
        "total": round(total, 2),
    }