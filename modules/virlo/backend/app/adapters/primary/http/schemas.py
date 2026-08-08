"""Pydantic v2 API schemas — camelCase JSON matching modules/virlo/src/types/schema.ts."""

from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


def _to_camel(name: str) -> str:
    parts = name.split("_")
    return parts[0] + "".join(p.title() for p in parts[1:])


class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=_to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


VideoPlatformLiteral = Literal["tiktok", "youtube_shorts", "instagram_reels"]


class VideoCardOut(CamelModel):
    id: str
    title: str
    thumbnail: str
    video_url: str
    views: int
    capture_score: float
    viral_rating: float
    platform: VideoPlatformLiteral
    tags: list[str]
    creator_handle: Optional[str] = None
    niche_id: Optional[str] = None
    published_at: Optional[str] = None


class DashboardMetricsOut(CamelModel):
    total_views: int
    view_trend_percentage: float
    active_trackers: int
    avg_engagement_rate: Optional[float] = None
    viral_video_count: Optional[int] = None
    creators_tracked: Optional[int] = None


class NicheCategoryOut(CamelModel):
    id: str
    name: str
    video_count: int
    trend_score: float
    slug: Optional[str] = None
    hashtags: Optional[list[str]] = None
    thumbnail_url: Optional[str] = None


class PricingPlanOut(CamelModel):
    id: str
    name: str
    monthly_price: Optional[int] = None
    annual_price: Optional[int] = None
    credits: Optional[int] = None
    features: list[str]
    cta_label: str
    description: Optional[str] = None
    highlighted: bool = False
    trial_days: Optional[int] = None


class UserProfileOut(CamelModel):
    id: str
    name: str
    email: EmailStr
    workspace_id: str
    avatar_url: Optional[str] = None
    plan_id: Optional[str] = None
    created_at: Optional[str] = None


class LoginRequest(CamelModel):
    email: EmailStr
    password: str = Field(min_length=6)


class LoginResponse(CamelModel):
    user: UserProfileOut
    token: str


class OrbitSearchRequest(CamelModel):
    keyword: str
    platform: Optional[str] = "all"
    min_views: Optional[int] = None
    max_days_ago: Optional[int] = None
    niche_id: Optional[str] = None
    sort_by: Optional[str] = "relevance"
    limit: Optional[int] = 24


class TrendingQuery(CamelModel):
    platform: Optional[str] = "all"
    niche_id: Optional[str] = None
    min_viral_rating: Optional[float] = None
    min_capture_score: Optional[float] = None
    sort_by: Optional[str] = "viral"
    limit: Optional[int] = 12
