"""Secondary ports — outbound repository abstractions (no infrastructure details)."""

from __future__ import annotations

from abc import ABC, abstractmethod

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


class AbstractVideoRepository(ABC):
    @abstractmethod
    async def get_trending(self, filters: VideoFilters | None = None) -> list[Video]:
        """Return trending / outlier videos for dashboard grids."""

    @abstractmethod
    async def search_vectors(self, query: OrbitSearchQuery) -> list[Video]:
        """Semantic / keyword search over short-form video embeddings (mock for now)."""


class AbstractMetricsRepository(ABC):
    @abstractmethod
    async def get_overview(self) -> DashboardMetrics:
        """Workspace overview KPIs for /dashboard."""


class AbstractNicheRepository(ABC):
    @abstractmethod
    async def get_all(self) -> list[Niche]:
        """List custom niche categories."""


class AbstractPricingRepository(ABC):
    @abstractmethod
    async def get_plans(self) -> list[PricingPlan]:
        """Pricing tiers for /pricing."""


class AbstractAuthRepository(ABC):
    @abstractmethod
    async def login(self, credentials: AuthCredentials) -> AuthSession:
        """Validate credentials and return a session token + user profile."""
