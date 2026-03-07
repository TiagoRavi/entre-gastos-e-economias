def calculate_top_expenses(transactions, limit=5):

    expenses = {}

    for t in transactions:

        if t.type != "expense":
            continue

        # ignora transferências
        if "transfer" in (t.description or "").lower():
            continue

        category = t.category.name if t.category else "Sem categoria"

        expenses[category] = expenses.get(category, 0) + abs(t.amount)

    sorted_expenses = sorted(
        expenses.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "category": category,
            "amount": amount
        }
        for category, amount in sorted_expenses[:limit]
    ]