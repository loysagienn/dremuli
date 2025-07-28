import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectSettings = (state: State) => state.settings;

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.theme
);

export const selectTimeZone = createSelector(
  selectSettings,
  (settings) => settings.timeZone
);

export const selectLanguage = createSelector(
  selectSettings,
  (settings) => settings.language
);
