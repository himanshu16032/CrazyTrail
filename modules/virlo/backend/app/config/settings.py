"""Application settings — env-driven, no hard-coded secrets."""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "CrazyTrail Virlo API"
    api_prefix: str = "/api/v1"
    debug: bool = True

    # CORS — Virlo Vite module + optional Next-style local ports
    cors_origins: str = (
        "http://localhost:5173,"
        "http://localhost:3000,"
        "http://127.0.0.1:5173,"
        "http://127.0.0.1:3000,"
        "https://www.crazytrail.com"
    )

    # Future Mongo (CrazyTrail Vercel naming) — unused by mock adapters
    mongodb_uri: str = ""
    mongodb_db: str = "crazytrail"
    mongodb_collection: str = "virlo_users"
    jwt_secret: str = "dev-only-change-me"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
