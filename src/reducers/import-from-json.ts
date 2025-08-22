import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

export const visible = createReducer<boolean>(
  {
    SHOW_IMPORT_FROM_JSON: () => true,
    CANCEL_IMPORT_FROM_JSON: () => false,
  },
  false
);

export const importFromJson = combineReducers({ visible });
