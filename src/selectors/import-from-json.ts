import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectImportFromJson = (state: State) => state.importFromJson;

export const selectImportFromJsonVisible = createSelector(
  selectImportFromJson,
  (importFromJson) => importFromJson.visible
);
