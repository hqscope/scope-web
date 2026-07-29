import { getRenderNow } from "@/lib/ui/render-time";

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const shortDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatDateLabel(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return shortDateFormatter.format(parsed);
}

export function formatDateTimeLabel(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return shortDateTimeFormatter.format(parsed);
}

export function formatRelativeTime(value: string | null, now = getRenderNow()): string {
  if (!value) {
    return "No sync yet";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "No sync yet";
  }

  const diffMs = parsed.getTime() - now;
  const absMs = Math.abs(diffMs);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absMs < hour) {
    const minutes = Math.max(1, Math.round(absMs / minute));
    return diffMs >= 0 ? `in ${minutes} min` : `${minutes} min ago`;
  }

  if (absMs < day) {
    const hours = Math.max(1, Math.round(absMs / hour));
    return diffMs >= 0 ? `in ${hours} hr` : `${hours} hr ago`;
  }

  const days = Math.max(1, Math.round(absMs / day));
  return diffMs >= 0 ? `in ${days} days` : `${days} days ago`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
