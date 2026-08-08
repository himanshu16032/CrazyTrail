from __future__ import annotations

from fastapi import APIRouter, Depends

from app.adapters.primary.http.deps import get_niche_repository
from app.adapters.primary.http.mappers import niche_to_out
from app.adapters.primary.http.schemas import NicheCategoryOut
from app.ports.repositories import AbstractNicheRepository

router = APIRouter(prefix="/niches", tags=["niches"])


@router.get("", response_model=list[NicheCategoryOut])
async def list_niches(
    repo: AbstractNicheRepository = Depends(get_niche_repository),
) -> list[NicheCategoryOut]:
    niches = await repo.get_all()
    return [niche_to_out(n) for n in niches]
