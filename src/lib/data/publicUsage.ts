import "server-only";

import type { User } from "@supabase/supabase-js";

import { CHROME_WEB_STORE_URL } from "@/lib/site";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const WEB_STORE_URL = `${CHROME_WEB_STORE_URL}?hl=en`;
const WEB_STORE_REVALIDATE_SECONDS = 60 * 60;
const AUTH_PAGE_SIZE = 1_000;

export interface PublicUsageSnapshot {
  extensionUsers: number;
  appleAccounts: number;
  combined: number;
  generatedAt: string;
}

export function parseWebStoreUserCount(html: string): number {
  const match = html.match(/([\d,.]+)\s*([KMB])?\+?\s+users\b/i);
  if (!match) {
    throw new Error("Chrome Web Store user count was not found.");
  }

  const value = Number(match[1].replaceAll(",", ""));
  const multiplier =
    match[2]?.toUpperCase() === "K"
      ? 1_000
      : match[2]?.toUpperCase() === "M"
        ? 1_000_000
        : match[2]?.toUpperCase() === "B"
          ? 1_000_000_000
          : 1;

  if (!Number.isFinite(value)) {
    throw new Error("Chrome Web Store user count was invalid.");
  }

  return Math.round(value * multiplier);
}

function hasAppleIdentity(user: User): boolean {
  if (user.identities?.some((identity) => identity.provider === "apple")) {
    return true;
  }

  const providers = user.app_metadata.providers;
  return (
    user.app_metadata.provider === "apple" ||
    (Array.isArray(providers) && providers.includes("apple"))
  );
}

async function getExtensionUsers(): Promise<number> {
  const response = await fetch(WEB_STORE_URL, {
    headers: {
      Accept: "text/html",
      "User-Agent": "scope-public-usage/1.0",
    },
    next: { revalidate: WEB_STORE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Chrome Web Store returned ${response.status}.`);
  }

  return parseWebStoreUserCount(await response.text());
}

async function getAppleAccounts(): Promise<number> {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    throw new Error("Supabase service role key is not configured.");
  }

  let page = 1;
  let appleAccounts = 0;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: AUTH_PAGE_SIZE,
    });

    if (error) {
      throw new Error(`Supabase Auth count failed: ${error.message}`);
    }

    appleAccounts += data.users.filter(hasAppleIdentity).length;

    if (data.users.length < AUTH_PAGE_SIZE) {
      return appleAccounts;
    }

    page += 1;
  }
}

export async function getPublicUsageSnapshot(): Promise<PublicUsageSnapshot> {
  const [extensionUsers, appleAccounts] = await Promise.all([
    getExtensionUsers(),
    getAppleAccounts(),
  ]);

  return {
    extensionUsers,
    appleAccounts,
    combined: extensionUsers + appleAccounts,
    generatedAt: new Date().toISOString(),
  };
}
