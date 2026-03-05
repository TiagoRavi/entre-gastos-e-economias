from collections import defaultdict
from datetime import datetime


def calculate_monthly_cashflow(transactions, month=None):

    monthly = defaultdict(lambda: {"income": 0, "expense": 0})

    # filtro por mês selecionado
    if month:

        year, m = month.split("-")
        year = int(year)
        m = int(m)

        transactions = [
            t for t in transactions
            if t.date.year == year and t.date.month == m
        ]

    for t in transactions:

        m = t.date.strftime("%b")

        if t.type == "income":
            monthly[m]["income"] += t.amount

        elif t.type == "expense":
            monthly[m]["expense"] += t.amount

    result = []

    for m, values in monthly.items():
        result.append({
            "month": m,
            "income": values["income"],
            "expense": values["expense"]
        })

    # se não houver transações retorna mês zerado
    if not result and month:

        m = datetime.strptime(month, "%Y-%m").strftime("%b")

        result.append({
            "month": m,
            "income": 0,
            "expense": 0
        })

    return result