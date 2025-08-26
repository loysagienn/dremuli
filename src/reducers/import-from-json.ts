import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

export const visible = createReducer<boolean>(
  {
    SHOW_IMPORT_FROM_JSON: () => true,
    CANCEL_IMPORT_FROM_JSON: () => false,
    IMPORT_FROM_JSON_DONE: () => false,
  },
  false
);

export const readingFile = createReducer<boolean>(
  {
    IMPORT_FROM_JSON_FILE: () => true,
    IMPORT_FROM_JSON_FILE_DONE: () => false,
    IMPORT_FROM_JSON_FILE_FAIL: () => false,
  },
  false
);

export const creatingEvents = createReducer<boolean>(
  {
    IMPORT_FROM_JSON_FILE_DONE: () => true,
    IMPORT_FROM_JSON_DONE: () => false,
  },
  false
);

export const errorMessage = createReducer<string | null>(
  {
    IMPORT_FROM_JSON_FILE: () => null,
    CANCEL_IMPORT_FROM_JSON: () => null,
    IMPORT_FROM_JSON_DONE: () => null,
    IMPORT_FROM_JSON_FILE_FAIL: (state, action) => action.errorMessage,
  },
  null
);

export const importFromJson = combineReducers({
  visible,
  readingFile,
  errorMessage,
  creatingEvents,
});
