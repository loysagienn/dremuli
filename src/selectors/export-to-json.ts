import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectExportToJson = (state: State) => state.exportToJson;

export const selectExportToJsonVisible = createSelector(
  selectExportToJson,
  (exportToJson) => exportToJson.visible
);
