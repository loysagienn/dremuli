import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectSessionSettings = (state: State) => state.sessionSettings;

export const selectTheme = createSelector(
  selectSessionSettings,
  (sessionSettings) => sessionSettings.theme
);

export const selectTimeZone = createSelector(
  selectSessionSettings,
  (sessionSettings) => sessionSettings.timeZone
);
