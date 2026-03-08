from dataclasses import dataclass
from decimal import Decimal


@dataclass
class IncomeByCategoryItem:
    category_id: int | None
    category_name: str
    total: Decimal