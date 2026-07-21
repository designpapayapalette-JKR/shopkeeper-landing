export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.managemycounter.com";
// Fallback API origin used when the primary custom domain cannot be resolved
// on a user's network (stale DNS or resolver mismatch). This keeps critical
// write flows (add/update/save) working from the web app.
export const API_FALLBACK_BASE = process.env.NEXT_PUBLIC_API_FALLBACK_URL || "https://api.managemycounter.com";
// The public URL of this web app itself — used when building shareable
// links (e.g. an invite message) that must resolve for someone who has
// never opened the app before, so it can't rely on window.location alone
// when generated server-side or copied for sharing elsewhere.
export const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL || "https://app.managemycounter.com";
// Beta invites are app-first by design: download the app, redeem the
// invite code there (creates the account + runs onboarding), and web
// access follows using the same login — not the other way round.
export const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ||
  "/downloads/shopkeeper-app-latest.apk";
// Invited staff/field agents use a separate, employee-facing app — not the
// owner-facing app above — so their invite message must link to this one.
export const AGENT_APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_AGENT_APP_DOWNLOAD_URL ||
  "/downloads/agent-app-latest.apk";
// Bump this any time either APK link/version above changes — shown on the
// landing page's Mobile Apps section so visitors can see the build is
// current. Format: "D MMM YYYY" (matches the rest of the site's date style).
export const MOBILE_APP_LAST_UPDATED = "21 Jul 2026";
