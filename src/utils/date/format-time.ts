const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // set to true if you want AM/PM
});

const formatters: { [key: string]: Intl.DateTimeFormat } = {};

function getFormatter(timeZone: string) {
  if (formatters[timeZone]) {
    return formatters[timeZone];
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // set to true if you want AM/PM
    timeZone,
  });

  formatters[timeZone] = formatter;

  return formatter;
}

export function formatTime(date: Date, timeZone?: string) {
  const formatter = timeZone ? getFormatter(timeZone) : defaultFormatter;

  return formatter.format(date);
}
