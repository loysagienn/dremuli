const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
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
    day: "numeric",
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function getMonthDay(date: Date, timeZone: string | null) {
  const formatter = getFormatter(timeZone);
  const monthDayStr = formatter.format(date);

  return parseInt(monthDayStr, 10);
}
