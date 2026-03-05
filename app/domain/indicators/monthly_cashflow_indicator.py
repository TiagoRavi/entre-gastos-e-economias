from collections import defaultdict


def calculate_monthly_cashflow(transactions):

    monthly = defaultdict(lambda: {"income": 0, "expense": 0})

    for t in transactions:

        month = t.date.strftime("%b")

        if t.type == "income":
            monthly[month]["income"] += t.amount

        elif t.type == "expense":
            monthly[month]["expense"] += t.amount

    result = []

    for month, values in monthly.items():
        result.append({
            "month": month,
            "income": values["income"],
            "expense": values["expense"]
        })

    return result