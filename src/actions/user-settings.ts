import { AppRoute } from "app/router";

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
