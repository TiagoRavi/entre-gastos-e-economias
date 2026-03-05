# app/utils/date_utils.py

from datetime import date, timedelta


def start_of_month(year: int, month: int) -> date:
    """
    Retorna o primeiro dia do mês.
    """
    return date(year, month, 1)


def end_of_month(year: int, month: int) -> date:
    """
    Retorna o último dia do mês.
    """
    if month == 12:
        return date(year, 12, 31)

    next_month = date(year, month + 1, 1)
    return next_month - timedelta(days=1)


def month_range(year: int, month: int) -> tuple[date, date]:
    """
    Retorna o intervalo completo do mês.
    """
    start = start_of_month(year, month)
    end = end_of_month(year, month)

    return start, end