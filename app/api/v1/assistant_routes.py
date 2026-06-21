from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.services.assistant_service import AssistantService

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.options("/finance", include_in_schema=False)
async def finance_assistant_options():
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/finance")
async def finance_assistant(
    payload: dict,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await AssistantService.handle_finance_question(
        db=db,
        user_id=current_user.id,
        payload=payload,
    )