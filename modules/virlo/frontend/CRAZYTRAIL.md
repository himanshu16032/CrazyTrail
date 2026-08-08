# Virlo frontend → CrazyTrail

UI lives in `modules/virlo/frontend`. API lives in `modules/virlo/backend`.

Mounted at **https://www.crazytrail.com/virlo**

## Develop

```bash
cd modules/virlo/frontend
npm i
npm run dev
```

## Publish static assets

```bash
npm run sync:crazytrail
```

Builds with `base: /virlo/` and copies to CrazyTrail `public/virlo/`.

## Auth / API

- Auth UI: `src/context/AuthContext.tsx`
- Mock client: `src/lib/auth/client.ts` → point `VITE_API_BASE_URL` at the FastAPI backend
- Backend: `../backend` (`uvicorn main:app --port 8000`)
- Google: `VITE_GOOGLE_CLIENT_ID`
- Mongo (server): `MONGODB_URI`, `MONGODB_DB`, `MONGODB_COLLECTION`
