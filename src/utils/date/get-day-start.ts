import { getMonth } from "./get-month";
import { getYear } from "./get-year";
import { getMonthDay } from "./get-month-day";
import { getHours } from "./get-hours";
import { getMinutes } from "./get-minutes";

// export function getDayStart2(date: Date, timeZone: string | null = null) {
//   console.log("date", date);
//   const dayStart = new Date(
//     getYear(date, timeZone),
//     getMonth(date, timeZone),
//     getMonthDay(date, timeZone)
//   );

//   // 1) Represent the given instant as local wall time in the target zone
//   const wall = new Date(date.toLocaleString("en-US", { timeZone }));

//   // 2) Jump to 00:00 of that local day
//   wall.setHours(0, 0, 0, 0);

//   // 3) Convert that wall time back to an absolute UTC instant
//   const utc = new Date(wall.toLocaleString("en-US", { timeZone: "UTC" }));

//   console.log("utc", utc);

//   return dayStart;
// }

export function getDayStart3(date: Date, timeZone: string | null = null) {
  const dayStart = new Date(date);
  dayStart.setSeconds(0, 0);

  const hours = getHours(dayStart, timeZone);
  const minutes = getMinutes(dayStart, timeZone);

  dayStart.setHours(
    dayStart.getHours() - hours,
    dayStart.getMinutes() - minutes
  );

  return dayStart;
}

export function getDayStart(date: Date, timeZone?: string | null): Date {
  // Build formatter for target zone (or local if timeZone is null/undefined)
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone ?? undefined,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    hourCycle: "h23", // ensures 0–23, so midnight is "0"
  });

  const parts = fmt.formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")!.value);
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  const s = Number(parts.find((p) => p.type === "second")!.value);

  // Subtract "time since that day’s midnight in the target zone"
  const sinceMidnightMs =
    ((h * 60 + m) * 60 + s) * 1000 + date.getMilliseconds();
  return new Date(date.getTime() - sinceMidnightMs);
}
