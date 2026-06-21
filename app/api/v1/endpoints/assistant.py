from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.assistant_service import AssistantService
from pydantic import BaseModel


# 🔒 Schema para validação (evita payload quebrado)
class FinanceAssistantRequest(BaseModel):
    message: str
    period: str | None = None


router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/finance")
async def finance_assistant(
    payload: FinanceAssistantRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        return await AssistantService.handle_finance_question(
            db=db,
            user_id=current_user.id,
            payload=payload.model_dump(),
        )

    except Exception as e:
        # 🔥 evita 500 silencioso + quebra de CORS
        raise HTTPException(
            status_code=500,
            detail=f"Assistant error: {str(e)}"
        )