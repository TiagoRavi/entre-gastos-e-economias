# app/utils/money_utils.py

from decimal import Decimal, ROUND_HALF_UP


def to_decimal(value) -> Decimal:
    """
    Converte um valor para Decimal com segurança.
    """
    return Decimal(str(value))


def round_money(value) -> Decimal:
    """
    Arredonda valores monetários para 2 casas decimais.
    """
    return to_decimal(value).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def add_money(a, b) -> Decimal:
    """
    Soma valores monetários com precisão.
    """
    return round_money(to_decimal(a) + to_decimal(b))


def subtract_money(a, b) -> Decimal:
    """
    Subtrai valores monetários com precisão.
    """
    return round_money(to_decimal(a) - to_decimal(b))