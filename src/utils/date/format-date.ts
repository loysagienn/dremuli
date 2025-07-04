const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short", // or 'long' for full month
  day: "2-digit",
});

const formatters: { [key: string]: Intl.DateTimeFormat } = {};

function getFormatter(timeZone: string) {
  if (formatters[timeZone]) {
    return formatters[timeZone];
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function formatDate(date: Date, timeZone?: string) {
  const formatter = timeZone ? getFormatter(timeZone) : defaultFormatter;

  return formatter.format(date);
}
