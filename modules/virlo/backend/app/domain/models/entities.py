"""Pure domain entities — no FastAPI, Pydantic, or DB driver imports."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal, Optional

VideoPlatform = Literal["tiktok", "youtube_shorts", "instagram_reels"]


@dataclass(frozen=True, slots=True)
class Video:
    id: str
    title: str
    thumbnail: str
    video_url: str
    views: int
    capture_score: float
    viral_rating: float
    platform: VideoPlatform
    tags: tuple[str, ...] = field(default_factory=tuple)
    creator_handle: Optional[str] = None
    niche_id: Optional[str] = None
    published_at: Optional[str] = None


@dataclass(frozen=True, slots=True)
class DashboardMetrics:
    total_views: int
    view_trend_percentage: float
    active_trackers: int
    avg_engagement_rate: Optional[float] = None
    viral_video_count: Optional[int] = None
    creators_tracked: Optional[int] = None


@dataclass(frozen=True, slots=True)
class Niche:
    id: str
    name: str
    video_count: int
    trend_score: float
    slug: Optional[str] = None
    hashtags: tuple[str, ...] = field(default_factory=tuple)
    thumbnail_url: Optional[str] = None


@dataclass(frozen=True, slots=True)
class PricingPlan:
    id: str
    name: str
    monthly_price: Optional[int]
    credits: Optional[int]
    features: tuple[str, ...]
    cta_label: str
    annual_price: Optional[int] = None
    description: Optional[str] = None
    highlighted: bool = False
    trial_days: Optional[int] = None


@dataclass(frozen=True, slots=True)
class UserProfile:
    id: str
    name: str
    email: str
    workspace_id: str
    avatar_url: Optional[str] = None
    plan_id: Optional[str] = None
    created_at: Optional[str] = None


@dataclass(frozen=True, slots=True)
class VideoFilters:
    platform: Optional[str] = None  # VideoPlatform | "all"
    niche_id: Optional[str] = None
    min_viral_rating: Optional[float] = None
    min_capture_score: Optional[float] = None
    tags: tuple[str, ...] = field(default_factory=tuple)
    sort_by: Optional[str] = None  # views | viral | recent | growth
    limit: Optional[int] = None


@dataclass(frozen=True, slots=True)
class OrbitSearchQuery:
    keyword: str
    platform: Optional[str] = "all"
    min_views: Optional[int] = None
    max_days_ago: Optional[int] = None
    niche_id: Optional[str] = None
    sort_by: Optional[str] = "relevance"
    limit: Optional[int] = 24


@dataclass(frozen=True, slots=True)
class AuthCredentials:
    email: str
    password: str


@dataclass(frozen=True, slots=True)
class AuthSession:
    user: UserProfile
    token: str
