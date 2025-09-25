const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  minute: "numeric",
});

const formatters: { [key: string]: Intl.DateTimeFormat } = {};

function getFormatter(timeZone: string | null) {
  if (!timeZone) {
    return defaultFormatter;
  }

  if (formatters[timeZone]) {
    return formatters[timeZone];
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function getMinutes(date: Date, timeZone: string | null) {
  const formatter = getFormatter(timeZone);
  const minutesStr = formatter.format(date);

  return parseInt(minutesStr, 10);
}
