from fastapi import APIRouter

from app.api.v1 import (
    auth_routes,
    user_routes,
    account_routes,
    category_routes,
    transaction_routes,
    budget_routes,
    indicator_routes,
    transfer_routes,
    assistant_routes,
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_routes.router)
api_router.include_router(user_routes.router)
api_router.include_router(account_routes.router)
api_router.include_router(category_routes.router)
api_router.include_router(transaction_routes.router)
api_router.include_router(budget_routes.router)
api_router.include_router(indicator_routes.router)
api_router.include_router(transfer_routes.router)
api_router.include_router(assistant_routes.router)