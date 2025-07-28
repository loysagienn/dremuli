import { AppRoute } from "app/router";
import { Lang } from "types";

export type SetTheme = {
  type: "SET_THEME";
  theme: "light" | "dark";
};

export function setTheme(theme: "light" | "dark"): SetTheme {
  return {
    type: "SET_THEME",
    theme,
  };
}

export type SetTimeZone = {
  type: "SET_TIME_ZONE";
  timeZone: string;
};

export function setTimeZone(timeZone: string): SetTimeZone {
  return {
    type: "SET_TIME_ZONE",
    timeZone,
  };
}

export type SetLanguage = {
  type: "SET_LANGUAGE";
  language: Lang;
};

export function setLanguage(language: Lang): SetLanguage {
  return {
    type: "SET_LANGUAGE",
    language,
  };
}
