#!/usr/bin/env node
/**
 * Builds the Virlo frontend with base=/virlo/ and copies dist → CrazyTrail public/virlo
 * so https://www.crazytrail.com/virlo serves this UI.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(__dirname, "..");
const dist = join(frontendRoot, "dist");
const crazytrail =
  process.env.CRAZYTRAIL_ROOT ||
  join(frontendRoot, "..", "..", ".."); // modules/virlo/frontend → CrazyTrail root
const target = join(crazytrail, "public", "virlo");

if (!existsSync(dist)) {
  console.error("Missing frontend/dist/. Run npm run build:crazytrail first.");
  process.exit(1);
}

if (!existsSync(join(crazytrail, "package.json"))) {
  console.error(`CrazyTrail root not found at ${crazytrail}`);
  console.error("Set CRAZYTRAIL_ROOT to your CrazyTrail checkout.");
  process.exit(1);
}

mkdirSync(join(crazytrail, "public"), { recursive: true });
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(dist, target, { recursive: true });

console.log(`Synced frontend/dist → ${target}`);
