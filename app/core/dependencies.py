from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from app.core.database import SessionLocal
from app.core.security import decode_access_token
from app.repositories.user_repository import get_user_by_id

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
    )

    try:
        payload = decode_access_token(token)
        if not payload:
            raise credentials_exception

        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        user_id = int(user_id)

    except (JWTError, ValueError, TypeError):
        raise credentials_exception

    user = get_user_by_id(db, user_id)

    if user is None:
        raise credentials_exception

    return user