const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: false,
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
    hour: "numeric",
    hour12: false,
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function getHours(date: Date, timeZone: string | null) {
  const formatter = getFormatter(timeZone);
  const hoursStr = formatter.format(date);

  return parseInt(hoursStr, 10);
}
