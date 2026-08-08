from __future__ import annotations

from fastapi import APIRouter, Depends

from app.adapters.primary.http.deps import get_pricing_repository
from app.adapters.primary.http.mappers import plan_to_out
from app.adapters.primary.http.schemas import PricingPlanOut
from app.ports.repositories import AbstractPricingRepository

router = APIRouter(prefix="/pricing", tags=["pricing"])


@router.get("/plans", response_model=list[PricingPlanOut])
async def list_plans(
    repo: AbstractPricingRepository = Depends(get_pricing_repository),
) -> list[PricingPlanOut]:
    plans = await repo.get_plans()
    return [plan_to_out(p) for p in plans]
