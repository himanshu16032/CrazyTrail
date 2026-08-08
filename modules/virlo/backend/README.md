# Virlo Backend (Hexagonal / Ports & Adapters)

Async FastAPI service for the CrazyTrail Virlo module.

```
modules/virlo/
├── frontend/   # Vite UI
└── backend/    # this service
```

Completely separate from the Vite frontend — swap mock secondary adapters for MongoDB / Vector DB later without changing HTTP routers.

## Layout

```
modules/virlo/backend/
├── main.py                          # FastAPI bootstrap + CORS
├── requirements.txt
├── .env.example
└── app/
    ├── config/settings.py           # Env settings
    ├── domain/models/entities.py    # Pure dataclasses (no FastAPI/Pydantic/DB)
    ├── ports/repositories.py        # ABC repository ports
    └── adapters/
        ├── primary/http/            # FastAPI routers + Pydantic schemas
        │   ├── deps.py              # Depends() → port injections
        │   ├── schemas.py           # camelCase ↔ frontend types/schema.ts
        │   ├── mappers.py
        │   └── routers/
        │       ├── videos.py        # GET /videos/trending, POST /videos/search
        │       ├── analytics.py     # GET /analytics/overview
        │       ├── niches.py        # GET /niches
        │       ├── auth.py          # POST /auth/login
        │       └── pricing.py       # GET /pricing/plans
        └── secondary/
            ├── mock_data.py
            └── mock_repository.py   # Async in-memory adapters
```

## Run

```bash
cd modules/virlo/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or from CrazyTrail root: `npm run virlo:api`

- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Demo auth

| Email | Password |
|-------|----------|
| `alex@virlo.ai` | `password123` |
| `demo@crazytrail.com` | `demo1234` |

## API (v1)

| Method | Path | Port |
|--------|------|------|
| GET | `/api/v1/videos/trending` | `AbstractVideoRepository.get_trending` |
| POST | `/api/v1/videos/search` | `AbstractVideoRepository.search_vectors` |
| GET | `/api/v1/analytics/overview` | `AbstractMetricsRepository.get_overview` |
| GET | `/api/v1/niches` | `AbstractNicheRepository.get_all` |
| GET | `/api/v1/pricing/plans` | `AbstractPricingRepository.get_plans` |
| POST | `/api/v1/auth/login` | `AbstractAuthRepository.login` |

JSON uses **camelCase** to match `modules/virlo/frontend/src/types/schema.ts`.

## CORS

Defaults allow `http://localhost:3000` and `http://localhost:5173` (Virlo Vite). Override via `CORS_ORIGINS`.
