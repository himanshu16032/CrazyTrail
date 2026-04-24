// Vercel Serverless Function: GET /api/d/:id  (rewritten from /d/:id)
//
// Fetches the saved dashboard payload from MongoDB by short id and
// returns the full HTML by inlining the bundled template + stylesheet.
//
// The HTML/CSS template is intentionally kept here (not in Mongo) so any
// future template improvements automatically apply to all saved dashboards
// without re-saving them.

import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the template + CSS at cold-start (cached for warm invocations).
const TEMPLATE = readFileSync(join(__dirname, "_template.html"), "utf8");
const CSS = readFileSync(join(__dirname, "_styles.css"), "utf8");

// Lucide rocket SVG, inline-safe inside href="..." (uses single quotes).
const FAVICON_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' " +
  "stroke='%236C63FF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>" +
  "<path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'/>" +
  "<path d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'/>" +
  "<path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'/>" +
  "<path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'/>" +
  "</svg>";

// Reuse a single MongoClient across warm invocations (Vercel best practice).
let _clientPromise = null;
function getClient() {
  if (!_clientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not configured");
    _clientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 5,
    }).connect();
  }
  return _clientPromise;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderHtml(payload) {
  // Mirror the Python renderer exactly: same placeholders, same `</` escape.
  const dataJson = JSON.stringify(payload).replace(/<\//g, "<\\/");
  return TEMPLATE
    .replaceAll("__INLINE_CSS__", CSS)
    .replaceAll("__DATA_JSON__", dataJson)
    .replaceAll("__BRAND_NAME__", escapeHtml(payload?.brand?.name || "CrazyTrail"))
    .replaceAll("__FAVICON_SVG__", FAVICON_SVG);
}

function notFoundHtml(id) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Not found · CrazyTrail</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:-apple-system,system-ui,sans-serif;background:#E8E6F0;color:#2D2B55;margin:0;min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px}
h1{font-size:28px;margin:0 0 8px}p{color:#6B6890;margin:0 0 16px}
a{color:#6C63FF;font-weight:700;text-decoration:none}</style></head>
<body><div><h1>Dashboard not found</h1>
<p>No dashboard exists for id <code>${escapeHtml(id)}</code>.</p>
<a href="/">← Back to crazytrail.com</a></div></body></html>`;
}

export default async function handler(req, res) {
  const id = (req.query?.id || "").toString().trim();
  if (!id || !/^[A-Za-z0-9_-]{4,32}$/.test(id)) {
    res.status(400).setHeader("content-type", "text/html; charset=utf-8");
    return res.send(notFoundHtml(id));
  }

  try {
    const client = await getClient();
    const dbName = process.env.MONGODB_DB || "crazytrail";
    const collName = process.env.MONGODB_COLLECTION || "dashboards";
    const doc = await client.db(dbName).collection(collName).findOne({ _id: id });

    if (!doc || !doc.payload) {
      res.status(404).setHeader("content-type", "text/html; charset=utf-8");
      return res.send(notFoundHtml(id));
    }

    const html = renderHtml(doc.payload);
    res.status(200);
    res.setHeader("content-type", "text/html; charset=utf-8");
    // Saved dashboards are immutable — let CDN/browser cache them.
    res.setHeader("cache-control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
    return res.send(html);
  } catch (err) {
    console.error("dashboard fetch error", err);
    res.status(500).setHeader("content-type", "text/html; charset=utf-8");
    return res.send(`<!doctype html><meta charset="utf-8"><title>Error</title>
<body style="font-family:system-ui;background:#E8E6F0;color:#2D2B55;display:grid;place-items:center;height:100vh;margin:0">
<div style="text-align:center"><h1>Something went wrong</h1>
<p style="color:#6B6890">Please try again in a moment.</p></div></body>`);
  }
}

export const config = {
  // Bundle the co-located template + stylesheet into the function output.
  includeFiles: "_*.{html,css}",
};
