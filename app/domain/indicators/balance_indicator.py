# app/indicators/balance_indicator.py

def calculate_balance(transactions):

    income = 0
    expenses = 0

    for t in transactions:

        if t.type == "income":
            income += t.amount

        elif t.type == "expense":
            expenses += t.amount

    balance = income - expenses

    return {
        "income": income,
        "expenses": expenses,
        "balance": balance
    }