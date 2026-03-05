# app/indicators/expense_indicator.py

def calculate_expenses_by_category(transactions):

    expenses = {}

    for transaction in transactions:

        if transaction.type != "expense":
            continue

        category_id = transaction.category_id

        if category_id not in expenses:
            expenses[category_id] = 0

        expenses[category_id] += transaction.amount

    return expenses