const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "numeric",
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
    month: "numeric",
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function getMonth(date: Date, timeZone: string | null) {
  const formatter = getFormatter(timeZone);
  const monthStr = formatter.format(date);

  return parseInt(monthStr, 10) - 1;
}
