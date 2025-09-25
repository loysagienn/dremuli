/**
 * Midnight (start of day) of the SAME calendar date as `localDate`
 * but in `timeZone`. Returns a Date = the UTC instant of that local midnight.
 *
 * Example: localDate = Sep 24 (in LA), timeZone = "Asia/Jerusalem"
 * → returns the instant for 2025-09-24T00:00:00+03:00
 */
export function getDayStartSameDate(
  localDate: Date,
  timeZone: string | null
): Date {
  // 1) Get the local Y/M/D (from host timezone)
  const y = localDate.getFullYear();
  const m = localDate.getMonth() + 1; // 1..12
  const d = localDate.getDate();

  // 2) Base reference: UTC midnight of that Y-M-D
  const t0 = Date.UTC(y, m - 1, d, 0, 0, 0);

  // 3) See what that UTC instant looks like in the target zone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone ?? undefined,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(t0));

  const y2 = +parts.find((p) => p.type === "year")!.value;
  const m2 = +parts.find((p) => p.type === "month")!.value;
  const d2 = +parts.find((p) => p.type === "day")!.value;
  const hh = +parts.find((p) => p.type === "hour")!.value;
  const mm = +parts.find((p) => p.type === "minute")!.value;

  // Day offset (in case the zone pushes t0 into prev/next day)
  const dayDiff = Math.round(
    (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y, m - 1, d)) / 86400000
  );

  // 4) Shift back by local time-of-day + any day offset to reach that zone's midnight
  const deltaMinutes = dayDiff * 1440 + hh * 60 + mm;
  return new Date(t0 - deltaMinutes * 60000);
}
