from __future__ import annotations

from fastapi import APIRouter, Depends

from app.adapters.primary.http.deps import get_metrics_repository
from app.adapters.primary.http.mappers import metrics_to_out
from app.adapters.primary.http.schemas import DashboardMetricsOut
from app.ports.repositories import AbstractMetricsRepository

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/overview", response_model=DashboardMetricsOut)
async def get_overview(
    repo: AbstractMetricsRepository = Depends(get_metrics_repository),
) -> DashboardMetricsOut:
    metrics = await repo.get_overview()
    return metrics_to_out(metrics)
