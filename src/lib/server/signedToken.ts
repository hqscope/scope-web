import { createHmac, timingSafeEqual } from "node:crypto";

export interface SignedTokenPayload {
  iat: number;
  exp: number;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function createSignedToken<T extends SignedTokenPayload>(
  payload: T,
  secret: string,
): string {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifySignedToken<T extends SignedTokenPayload>(
  token: string,
  secret: string,
): T | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload, secret);
  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fromBase64Url(encodedPayload));
    if (!isObject(parsed)) {
      return null;
    }

    const exp = parsed.exp;
    const iat = parsed.iat;

    if (typeof exp !== "number" || typeof iat !== "number") {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if (exp <= now) {
      return null;
    }

    return parsed as T;
  } catch {
    return null;
  }
}
