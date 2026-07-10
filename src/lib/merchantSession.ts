import { API_BASE, API_FALLBACK_BASE } from "./config";

// Merchant Portal session — the web version of the app itself, logged in
// with the SAME credentials a company's owner/manager/staff uses to sign
// into the mobile app (POST /auth/login). This is deliberately a separate
// concept from the SaaS Super Admin session (superAdminSession.ts): a
// merchant login must never grant access to the Super Admin panel, and a
// super admin's token must never be treated as a merchant session here.
const TOKEN_KEY = "shopkeeper_access_token";
const REFRESH_KEY = "shopkeeper_refresh_token";
let refreshInFlight: Promise<string | null> | null = null;

export function getMerchantToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getMerchantRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setMerchantSession(accessToken: string, refreshToken?: string) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearMerchantSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

function buildApiUrl(path: string, useFallback: boolean = false): string {
  const base = useFallback ? API_FALLBACK_BASE : API_BASE;
  return `${base}${path}`;
}

async function fetchWithFailover(path: string, options: RequestInit = {}): Promise<Response> {
  try {
    return await fetch(buildApiUrl(path, false), options);
  } catch {
    // Retry through the stable Railway origin when custom domain DNS fails.
    return fetch(buildApiUrl(path, true), options);
  }
}

export async function refreshMerchantAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
  const refreshToken = getMerchantRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetchWithFailover("/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.accessToken) {
      clearMerchantSession();
      return null;
    }

    setMerchantSession(json.accessToken, refreshToken);
    return json.accessToken;
  } catch {
    return null;
  }
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

export async function merchantLogin(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetchWithFailover("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.accessToken) {
    return { ok: false, error: json?.error ?? "Invalid email or password" };
  }
  setMerchantSession(json.accessToken, json.refreshToken);
  return { ok: true };
}

// Convenience wrapper so dashboard pages don't repeat the Authorization
// header boilerplate — attaches the stored merchant token automatically.
export async function merchantFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getMerchantToken();
  const headers = new Headers(options.headers ?? {});
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetchWithFailover(path, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshedToken = await refreshMerchantAccessToken();
    if (!refreshedToken) {
      clearMerchantSession();
      if (typeof window !== "undefined") {
        const onAuthPage = window.location.pathname.startsWith("/login") || window.location.pathname.startsWith("/register");
        if (!onAuthPage) {
          window.location.assign("/login?reason=session-expired");
        }
      }
      return response;
    }

    const retryHeaders = new Headers(options.headers ?? {});
    retryHeaders.set("Authorization", `Bearer ${refreshedToken}`);

    const retryResponse = await fetchWithFailover(path, {
      ...options,
      headers: retryHeaders,
    });

    if (retryResponse.status === 401) {
      const body = await retryResponse.clone().json().catch(() => null);
      if (body?.error?.toLowerCase().includes("token") || body?.error?.toLowerCase().includes("expired")) {
        clearMerchantSession();
        if (typeof window !== "undefined") {
          window.location.assign("/login?reason=session-expired");
        }
      }
    }

    return retryResponse;
  }

  return response;
}
