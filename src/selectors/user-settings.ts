import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectUserSettings = (state: State) => state.userSettings;

export const selectTheme = createSelector(
  selectUserSettings,
  (userSettings) => userSettings.theme
);
