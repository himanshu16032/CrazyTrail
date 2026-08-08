"""Mapper helpers: domain entities -> API schemas."""

from __future__ import annotations

from app.adapters.primary.http.schemas import (
    DashboardMetricsOut,
    NicheCategoryOut,
    PricingPlanOut,
    UserProfileOut,
    VideoCardOut,
)
from app.domain.models import DashboardMetrics, Niche, PricingPlan, UserProfile, Video


def video_to_out(v: Video) -> VideoCardOut:
    return VideoCardOut(
        id=v.id,
        title=v.title,
        thumbnail=v.thumbnail,
        video_url=v.video_url,
        views=v.views,
        capture_score=v.capture_score,
        viral_rating=v.viral_rating,
        platform=v.platform,
        tags=list(v.tags),
        creator_handle=v.creator_handle,
        niche_id=v.niche_id,
        published_at=v.published_at,
    )


def metrics_to_out(m: DashboardMetrics) -> DashboardMetricsOut:
    return DashboardMetricsOut(
        total_views=m.total_views,
        view_trend_percentage=m.view_trend_percentage,
        active_trackers=m.active_trackers,
        avg_engagement_rate=m.avg_engagement_rate,
        viral_video_count=m.viral_video_count,
        creators_tracked=m.creators_tracked,
    )


def niche_to_out(n: Niche) -> NicheCategoryOut:
    return NicheCategoryOut(
        id=n.id,
        name=n.name,
        video_count=n.video_count,
        trend_score=n.trend_score,
        slug=n.slug,
        hashtags=list(n.hashtags) if n.hashtags else None,
        thumbnail_url=n.thumbnail_url,
    )


def plan_to_out(p: PricingPlan) -> PricingPlanOut:
    return PricingPlanOut(
        id=p.id,
        name=p.name,
        monthly_price=p.monthly_price,
        annual_price=p.annual_price,
        credits=p.credits,
        features=list(p.features),
        cta_label=p.cta_label,
        description=p.description,
        highlighted=p.highlighted,
        trial_days=p.trial_days,
    )


def user_to_out(u: UserProfile) -> UserProfileOut:
    return UserProfileOut(
        id=u.id,
        name=u.name,
        email=u.email,
        workspace_id=u.workspace_id,
        avatar_url=u.avatar_url,
        plan_id=u.plan_id,
        created_at=u.created_at,
    )
