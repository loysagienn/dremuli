const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
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
    year: "numeric",
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function getYear(date: Date, timeZone: string | null) {
  const formatter = getFormatter(timeZone);
  const yearStr = formatter.format(date);

  return parseInt(yearStr, 10);
}
