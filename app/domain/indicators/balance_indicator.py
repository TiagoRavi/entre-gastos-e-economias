def calculate_balance(transactions):

    income = 0
    expenses = 0

    for t in transactions:

        # ignora transferências
        if "transfer" in (t.description or "").lower():
            continue

        if t.type == "income":
            income += float(t.amount)

        elif t.type == "expense":
            expenses += abs(float(t.amount))

    balance = income - expenses

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance
    }