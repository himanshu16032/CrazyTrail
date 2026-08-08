#!/usr/bin/env node
/**
 * Syncs the Virlo module build into CrazyTrail at public/virlo
 * so https://www.crazytrail.com/virlo serves this UI.
 * Also mirrors source into modules/virlo for the CrazyTrail layout.
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const crazytrail =
  process.env.CRAZYTRAIL_ROOT ||
  "/Users/pranavsingh/Desktop/projects/CrazyTrail";
const target = join(crazytrail, "public", "virlo");
const modulesTarget = join(crazytrail, "modules", "virlo");

if (!existsSync(dist)) {
  console.error("Missing dist/. Run npm run build:crazytrail first.");
  process.exit(1);
}

if (!existsSync(crazytrail)) {
  console.error(`CrazyTrail not found at ${crazytrail}`);
  console.error("Set CRAZYTRAIL_ROOT to your CrazyTrail checkout.");
  process.exit(1);
}

mkdirSync(join(crazytrail, "public"), { recursive: true });
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(dist, target, { recursive: true });

mkdirSync(join(crazytrail, "modules"), { recursive: true });
rmSync(modulesTarget, { recursive: true, force: true });
mkdirSync(modulesTarget, { recursive: true });
execSync(
  `rsync -a --delete \
    --exclude node_modules \
    --exclude dist \
    --exclude cursor_site_blueprint \
    --exclude site_blueprint.json \
    --exclude .git \
    "${root}/" "${modulesTarget}/"`,
  { stdio: "inherit" }
);

writeFileSync(
  join(modulesTarget, "CRAZYTRAIL.md"),
  `# Virlo → CrazyTrail module

Mounted at **https://www.crazytrail.com/virlo**

## Develop

\`\`\`bash
cd modules/virlo
npm i
npm run dev
\`\`\`

## Publish static assets into CrazyTrail

\`\`\`bash
npm run sync:crazytrail
\`\`\`

Builds with \`base: /virlo/\` and copies to \`public/virlo/\`.

## Auth / Mongo

- Auth UI: \`src/context/AuthContext.tsx\` (Drift-style)
- Mock client: \`src/lib/auth/client.ts\` → swap for FastAPI via \`VITE_API_BASE_URL\`
- Google: \`VITE_GOOGLE_CLIENT_ID\`
- Server Mongo (CrazyTrail / Vercel): \`MONGODB_URI\`, \`MONGODB_DB\`, \`MONGODB_COLLECTION\`
`
);

console.log(`Synced dist → ${target}`);
console.log(`Synced source → ${modulesTarget}`);
