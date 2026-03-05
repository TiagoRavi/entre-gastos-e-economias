# app/indicators/savings_indicator.py

def calculate_savings_rate(transactions):

    total_income = 0
    total_expenses = 0

    for transaction in transactions:

        if transaction.type == "income":
            total_income += transaction.amount

        elif transaction.type == "expense":
            total_expenses += transaction.amount

    if total_income == 0:
        return {
            "income": 0,
            "expenses": total_expenses,
            "savings_rate": 0
        }

    savings_rate = (total_income - total_expenses) / total_income

    return {
        "income": total_income,
        "expenses": total_expenses,
        "savings_rate": savings_rate
    }