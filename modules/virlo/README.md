# Virlo module (CrazyTrail)

```
modules/virlo/
├── frontend/   # Vite + React UI (served at /virlo)
└── backend/    # FastAPI hexagonal API
```

## Frontend

```bash
cd modules/virlo/frontend
npm i
npm run dev                 # http://localhost:5173
npm run sync:crazytrail     # build base=/virlo/ → public/virlo/
```

## Backend

```bash
cd modules/virlo/backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs
