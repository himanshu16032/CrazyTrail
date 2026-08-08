from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.adapters.primary.http.deps import get_auth_repository
from app.adapters.primary.http.mappers import user_to_out
from app.adapters.primary.http.schemas import LoginRequest, LoginResponse
from app.domain.models import AuthCredentials
from app.ports.repositories import AbstractAuthRepository

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
async def login(
    body: LoginRequest,
    repo: AbstractAuthRepository = Depends(get_auth_repository),
) -> LoginResponse:
    try:
        session = await repo.login(
            AuthCredentials(email=str(body.email), password=body.password)
        )
    except PermissionError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc

    return LoginResponse(user=user_to_out(session.user), token=session.token)
