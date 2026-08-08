from __future__ import annotations

from fastapi import APIRouter, Depends, Query

from app.adapters.primary.http.deps import get_video_repository
from app.adapters.primary.http.mappers import video_to_out
from app.adapters.primary.http.schemas import OrbitSearchRequest, VideoCardOut
from app.domain.models import OrbitSearchQuery, VideoFilters
from app.ports.repositories import AbstractVideoRepository

router = APIRouter(prefix="/videos", tags=["videos"])


@router.get("/trending", response_model=list[VideoCardOut])
async def get_trending_videos(
    platform: str | None = Query(default="all"),
    niche_id: str | None = Query(default=None, alias="nicheId"),
    min_viral_rating: float | None = Query(default=None, alias="minViralRating"),
    min_capture_score: float | None = Query(default=None, alias="minCaptureScore"),
    sort_by: str | None = Query(default="viral", alias="sortBy"),
    limit: int | None = Query(default=12),
    repo: AbstractVideoRepository = Depends(get_video_repository),
) -> list[VideoCardOut]:
    filters = VideoFilters(
        platform=platform,
        niche_id=niche_id,
        min_viral_rating=min_viral_rating,
        min_capture_score=min_capture_score,
        sort_by=sort_by,
        limit=limit,
    )
    videos = await repo.get_trending(filters)
    return [video_to_out(v) for v in videos]


@router.post("/search", response_model=list[VideoCardOut])
async def search_videos(
    body: OrbitSearchRequest,
    repo: AbstractVideoRepository = Depends(get_video_repository),
) -> list[VideoCardOut]:
    query = OrbitSearchQuery(
        keyword=body.keyword,
        platform=body.platform,
        min_views=body.min_views,
        max_days_ago=body.max_days_ago,
        niche_id=body.niche_id,
        sort_by=body.sort_by,
        limit=body.limit,
    )
    videos = await repo.search_vectors(query)
    return [video_to_out(v) for v in videos]
