import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectImportFromJson = (state: State) => state.importFromJson;

export const selectImportFromJsonVisible = createSelector(
  selectImportFromJson,
  (importFromJson) => importFromJson.visible
);

export const selectImportFromJsonReading = createSelector(
  selectImportFromJson,
  (importFromJson) => importFromJson.readingFile
);

export const selectImportFromJsonError = createSelector(
  selectImportFromJson,
  (importFromJson) => importFromJson.errorMessage
);

export const selectImportFromJsonCreatingEvents = createSelector(
  selectImportFromJson,
  (importFromJson) => importFromJson.creatingEvents
);
