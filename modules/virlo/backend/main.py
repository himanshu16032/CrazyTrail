"""
CrazyTrail Virlo API — Hexagonal (Ports & Adapters) FastAPI bootstrap.

Run from repo root or backend/:
  cd backend && uvicorn main:app --reload --port 8000
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.adapters.primary.http.routers import analytics, auth, niches, pricing, videos
from app.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    prefix = settings.api_prefix
    application.include_router(videos.router, prefix=prefix)
    application.include_router(analytics.router, prefix=prefix)
    application.include_router(niches.router, prefix=prefix)
    application.include_router(auth.router, prefix=prefix)
    application.include_router(pricing.router, prefix=prefix)

    @application.get("/health")
    async def health() -> dict[str, str]:
        return {"status": "ok", "service": settings.app_name}

    return application


app = create_app()
