export function getDaysDiff(pastDate: Date): number {
  const today = new Date();
  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const utcPast = Date.UTC(
    pastDate.getFullYear(),
    pastDate.getMonth(),
    pastDate.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcToday - utcPast) / msPerDay);
}
