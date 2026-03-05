# app/indicators/projection_indicator.py

def calculate_projection(transactions):

    total_expenses = 0
    count = 0

    for transaction in transactions:

        if transaction.type == "expense":
            total_expenses += transaction.amount
            count += 1

    if count == 0:
        return {
            "average_expense": 0,
            "monthly_projection": 0
        }

    average_expense = total_expenses / count

    monthly_projection = average_expense * 30

    return {
        "average_expense": average_expense,
        "monthly_projection": monthly_projection
    }