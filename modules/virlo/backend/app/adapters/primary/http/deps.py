"""FastAPI dependency injection — primary adapters depend on port ABCs only."""

from __future__ import annotations

from functools import lru_cache

from fastapi import Depends

from app.adapters.secondary.mock_repository import (
    MockAuthRepository,
    MockMetricsRepository,
    MockNicheRepository,
    MockPricingRepository,
    MockVideoRepository,
)
from app.ports.repositories import (
    AbstractAuthRepository,
    AbstractMetricsRepository,
    AbstractNicheRepository,
    AbstractPricingRepository,
    AbstractVideoRepository,
)


@lru_cache
def get_video_repository() -> AbstractVideoRepository:
    return MockVideoRepository()


@lru_cache
def get_metrics_repository() -> AbstractMetricsRepository:
    return MockMetricsRepository()


@lru_cache
def get_niche_repository() -> AbstractNicheRepository:
    return MockNicheRepository()


@lru_cache
def get_pricing_repository() -> AbstractPricingRepository:
    return MockPricingRepository()


@lru_cache
def get_auth_repository() -> AbstractAuthRepository:
    return MockAuthRepository()


VideoRepoDep = Depends(get_video_repository)
MetricsRepoDep = Depends(get_metrics_repository)
NicheRepoDep = Depends(get_niche_repository)
PricingRepoDep = Depends(get_pricing_repository)
AuthRepoDep = Depends(get_auth_repository)
