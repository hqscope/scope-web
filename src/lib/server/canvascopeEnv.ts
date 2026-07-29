const DEFAULT_LOCAL_BASE_URL = "http://localhost:3000";
const DEFAULT_DEV_SESSION_SECRET = "canvascope-dev-secret-change-me";

function normalizeBaseUrl(raw: string | undefined): string {
  const value = raw?.trim() || DEFAULT_LOCAL_BASE_URL;
  const url = new URL(value);
  return url.toString().replace(/\/$/, "");
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getCanvascopeAuthBaseUrl(): string {
  return normalizeBaseUrl(process.env.CANVASCOPE_AUTH_BASE_URL);
}

export function getCanvascopeSessionSecret(): string {
  const configured = process.env.CANVASCOPE_SESSION_SECRET?.trim();
  if (configured) {
    return configured;
  }

  if (!isProduction()) {
    return DEFAULT_DEV_SESSION_SECRET;
  }

  throw new Error("CANVASCOPE_SESSION_SECRET must be set in production.");
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} must be set.`);
  }
  return value;
}

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export function getGoogleOAuthConfig(): GoogleOAuthConfig {
  const baseUrl = getCanvascopeAuthBaseUrl();

  return {
    clientId: requireEnv("GOOGLE_OAUTH_CLIENT_ID"),
    clientSecret: requireEnv("GOOGLE_OAUTH_CLIENT_SECRET"),
    redirectUri: `${baseUrl}/api/auth/google/callback`,
  };
}
