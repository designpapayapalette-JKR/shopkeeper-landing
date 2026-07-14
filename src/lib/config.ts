export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.papayapalette.online";
// Fallback API origin used when the primary custom domain cannot be resolved
// on a user's network (stale DNS or resolver mismatch). This keeps critical
// write flows (add/update/save) working from the web app.
export const API_FALLBACK_BASE = process.env.NEXT_PUBLIC_API_FALLBACK_URL || "https://api.papayapalette.online";
// The public URL of this web app itself — used when building shareable
// links (e.g. an invite message) that must resolve for someone who has
// never opened the app before, so it can't rely on window.location alone
// when generated server-side or copied for sharing elsewhere.
export const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL || "https://shopkeeper-web.vercel.app";
// Beta invites are app-first by design: download the app, redeem the
// invite code there (creates the account + runs onboarding), and web
// access follows using the same login — not the other way round.
export const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ||
  "https://github.com/designpapayapalette-JKR/shopkeeper-app/releases/download/beta-latest/shopkeeper-app-latest.apk";
// Invited staff/field agents use a separate, employee-facing app — not the
// owner-facing app above — so their invite message must link to this one.
export const AGENT_APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_AGENT_APP_DOWNLOAD_URL ||
  "https://github.com/designpapayapalette-JKR/agent-app/releases/download/beta-latest/agent-app-latest.apk";
// Offline Windows desktop edition — hosted on Vercel Blob rather than a
// GitHub release since the desktop app's source repo is private (contains
// license/anti-tamper enforcement code that isn't meant to be public).
export const DESKTOP_APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DESKTOP_APP_DOWNLOAD_URL ||
  "https://ngcc7dhf9zqcd9sa.public.blob.vercel-storage.com/shopkeeper-desktop-latest-XnhUSU0lfGHkxkgPkOyV83KZZyIHxF.exe";
