export function getDaysDiff(pastDate: Date): number {
  const today = new Date();
  const utcToday = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const utcPast = Date.UTC(
    pastDate.getUTCFullYear(),
    pastDate.getUTCMonth(),
    pastDate.getUTCDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcToday - utcPast) / msPerDay);
}
