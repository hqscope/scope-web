export interface ParsedReminderFields {
  title: string;
  dueAtIso: string | null;
  repeatDaily: boolean;
}

interface ClockTime {
  hour: number;
  minute: number;
}

function cleanTitle(rawText: string): string {
  const trimmed = rawText.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return "Untitled reminder";
  }

  return trimmed.slice(0, 120);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function withTime(baseDate: Date, time: ClockTime): Date {
  return new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    time.hour,
    time.minute,
    0,
    0,
  );
}

function parseClockTime(rawText: string): ClockTime | null {
  const twelveHour = rawText.match(/\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i);
  if (twelveHour) {
    const hourRaw = Number.parseInt(twelveHour[1], 10);
    const minuteRaw = twelveHour[2] ? Number.parseInt(twelveHour[2], 10) : 0;

    if (Number.isNaN(hourRaw) || Number.isNaN(minuteRaw) || minuteRaw > 59) {
      return null;
    }

    const normalizedHour = hourRaw % 12 + (twelveHour[3].toLowerCase() === "pm" ? 12 : 0);
    return { hour: normalizedHour, minute: minuteRaw };
  }

  const twentyFourHour = rawText.match(/\b(?:at\s+)?([01]?\d|2[0-3]):([0-5]\d)\b/);
  if (twentyFourHour) {
    return {
      hour: Number.parseInt(twentyFourHour[1], 10),
      minute: Number.parseInt(twentyFourHour[2], 10),
    };
  }

  return null;
}

function parseRelativeDueDate(rawText: string, now: Date): Date | null {
  const relativeMatch = rawText.match(
    /\bin\s+(\d+)\s*(minute|minutes|min|hour|hours|hr|hrs)\b/i,
  );

  if (!relativeMatch) {
    return null;
  }

  const amount = Number.parseInt(relativeMatch[1], 10);
  if (Number.isNaN(amount) || amount <= 0) {
    return null;
  }

  const unit = relativeMatch[2].toLowerCase();
  const minutesToAdd = unit.startsWith("h") ? amount * 60 : amount;

  return new Date(now.getTime() + minutesToAdd * 60 * 1000);
}

function parseKeywordDueDate(rawText: string, now: Date): Date | null {
  const time = parseClockTime(rawText);

  if (/\btomorrow\b/i.test(rawText)) {
    const tomorrow = startOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    return withTime(tomorrow, time ?? { hour: 9, minute: 0 });
  }

  if (/\btoday\b/i.test(rawText)) {
    const today = startOfDay(now);
    if (time) {
      return withTime(today, time);
    }

    return new Date(now.getTime() + 60 * 60 * 1000);
  }

  if (time) {
    const today = withTime(startOfDay(now), time);
    if (today.getTime() > now.getTime()) {
      return today;
    }

    return withTime(startOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000)), time);
  }

  return null;
}

function toIsoOrNull(date: Date | null): string | null {
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export function parseReminderFromText(
  rawText: string,
  now: Date = new Date(),
): ParsedReminderFields {
  const repeatDaily = /\b(every day|daily|each day)\b/i.test(rawText);
  const relativeDueDate = parseRelativeDueDate(rawText, now);
  const keywordDueDate = relativeDueDate ? null : parseKeywordDueDate(rawText, now);

  return {
    title: cleanTitle(rawText),
    dueAtIso: toIsoOrNull(relativeDueDate ?? keywordDueDate),
    repeatDaily,
  };
}
