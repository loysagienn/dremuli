import { Lang } from "types";

const langMap: { [key in Lang]: string } = {
  en: "en-US",
  ru: "ru-RU",
};

const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short", // or 'long' for full month
  day: "2-digit",
});

const formatters: { [key: string]: Intl.DateTimeFormat } = {};

type FormatOptions = {
  timeZone?: string;
  lang?: Lang;
};

function getFormatter(options: FormatOptions) {
  const key = `${options.timeZone || ""}:${options.lang || ""}`;

  if (formatters[key]) {
    return formatters[key];
  }

  const formatter = new Intl.DateTimeFormat(langMap[options.lang || "en"], {
    month: options.lang === "ru" ? "long" : "short",
    day: "2-digit",
    timeZone: options.timeZone,
  });

  formatters[key] = formatter;

  return formatter;
}

export function formatDate(date: Date, options?: FormatOptions) {
  const formatter = options ? getFormatter(options) : defaultFormatter;

  return formatter.format(date);
}
