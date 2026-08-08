# Virlo → CrazyTrail module

Mounted at **https://www.crazytrail.com/virlo**

## Develop

```bash
cd modules/virlo
npm i
npm run dev
```

## Publish static assets into CrazyTrail

```bash
npm run sync:crazytrail
```

Builds with `base: /virlo/` and copies to `public/virlo/`.

## Auth / Mongo

- Auth UI: `src/context/AuthContext.tsx` (Drift-style)
- Mock client: `src/lib/auth/client.ts` → swap for FastAPI via `VITE_API_BASE_URL`
- Google: `VITE_GOOGLE_CLIENT_ID`
- Server Mongo (CrazyTrail / Vercel): `MONGODB_URI`, `MONGODB_DB`, `MONGODB_COLLECTION`
