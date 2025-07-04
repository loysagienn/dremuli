export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hr${hours !== 1 ? "s" : ""}`);
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes} min${minutes !== 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}
