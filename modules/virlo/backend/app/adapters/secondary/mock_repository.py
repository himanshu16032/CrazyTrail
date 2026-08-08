"""Async mock secondary adapters — swap for MongoDB / Vector DB later."""

from __future__ import annotations

import asyncio
import base64
import time
from datetime import datetime, timezone

from app.adapters.secondary.mock_data import (
    MOCK_METRICS,
    MOCK_NICHES,
    MOCK_PLANS,
    MOCK_USERS,
    MOCK_VIDEOS,
)
from app.domain.models import (
    AuthCredentials,
    AuthSession,
    DashboardMetrics,
    Niche,
    OrbitSearchQuery,
    PricingPlan,
    Video,
    VideoFilters,
)
from app.ports.repositories import (
    AbstractAuthRepository,
    AbstractMetricsRepository,
    AbstractNicheRepository,
    AbstractPricingRepository,
    AbstractVideoRepository,
)


async def _tick(ms: float = 40) -> None:
    await asyncio.sleep(ms / 1000)


def _matches_platform(video: Video, platform: str | None) -> bool:
    if not platform or platform == "all":
        return True
    return video.platform == platform


def _apply_filters(videos: list[Video], filters: VideoFilters | None) -> list[Video]:
    result = list(videos)
    if not filters:
        return result[:12]

    if filters.platform:
        result = [v for v in result if _matches_platform(v, filters.platform)]
    if filters.niche_id:
        result = [v for v in result if v.niche_id == filters.niche_id]
    if filters.min_viral_rating is not None:
        result = [v for v in result if v.viral_rating >= filters.min_viral_rating]
    if filters.min_capture_score is not None:
        result = [v for v in result if v.capture_score >= filters.min_capture_score]
    if filters.tags:
        wanted = {t.lower() for t in filters.tags}
        result = [v for v in result if wanted.intersection(tag.lower() for tag in v.tags)]

    sort_by = filters.sort_by or "viral"
    if sort_by == "views":
        result.sort(key=lambda v: v.views, reverse=True)
    elif sort_by == "recent":
        result.sort(key=lambda v: v.published_at or "", reverse=True)
    elif sort_by == "growth":
        result.sort(key=lambda v: v.capture_score, reverse=True)
    else:
        result.sort(key=lambda v: v.viral_rating, reverse=True)

    limit = filters.limit if filters.limit is not None else 12
    return result[:limit]


class MockVideoRepository(AbstractVideoRepository):
    async def get_trending(self, filters: VideoFilters | None = None) -> list[Video]:
        await _tick()
        return _apply_filters(MOCK_VIDEOS, filters)

    async def search_vectors(self, query: OrbitSearchQuery) -> list[Video]:
        await _tick(80)
        keyword = query.keyword.strip().lower()
        results = [v for v in MOCK_VIDEOS if _matches_platform(v, query.platform)]

        if keyword:
            def haystack(v: Video) -> str:
                return " ".join(
                    [
                        v.title,
                        v.creator_handle or "",
                        " ".join(v.tags),
                        v.niche_id or "",
                    ]
                ).lower()

            results = [v for v in results if keyword in haystack(v)]

        if query.niche_id:
            results = [v for v in results if v.niche_id == query.niche_id]
        if query.min_views is not None:
            results = [v for v in results if v.views >= query.min_views]
        if query.max_days_ago is not None:
            cutoff = time.time() - query.max_days_ago * 86_400
            filtered: list[Video] = []
            for v in results:
                if not v.published_at:
                    filtered.append(v)
                    continue
                try:
                    ts = datetime.fromisoformat(v.published_at.replace("Z", "+00:00")).timestamp()
                except ValueError:
                    filtered.append(v)
                    continue
                if ts >= cutoff:
                    filtered.append(v)
            results = filtered

        sort_by = query.sort_by or "relevance"
        if sort_by == "views":
            results.sort(key=lambda v: v.views, reverse=True)
        elif sort_by == "viral":
            results.sort(key=lambda v: v.viral_rating, reverse=True)
        elif sort_by == "growth":
            results.sort(key=lambda v: v.capture_score, reverse=True)
        elif sort_by == "recent":
            results.sort(key=lambda v: v.published_at or "", reverse=True)
        else:
            results.sort(key=lambda v: v.viral_rating * v.views, reverse=True)

        return results[: (query.limit or 24)]


class MockMetricsRepository(AbstractMetricsRepository):
    async def get_overview(self) -> DashboardMetrics:
        await _tick()
        return MOCK_METRICS


class MockNicheRepository(AbstractNicheRepository):
    async def get_all(self) -> list[Niche]:
        await _tick()
        return list(MOCK_NICHES)


class MockPricingRepository(AbstractPricingRepository):
    async def get_plans(self) -> list[PricingPlan]:
        await _tick()
        return list(MOCK_PLANS)


class MockAuthRepository(AbstractAuthRepository):
    async def login(self, credentials: AuthCredentials) -> AuthSession:
        await _tick(120)
        key = credentials.email.strip().lower()
        record = MOCK_USERS.get(key)
        if not record or record[0] != credentials.password:
            raise PermissionError("Invalid email or password")
        user = record[1]
        token = "mock." + base64.urlsafe_b64encode(user.id.encode()).decode().rstrip("=") + f".{int(time.time())}"
        return AuthSession(user=user, token=token)
