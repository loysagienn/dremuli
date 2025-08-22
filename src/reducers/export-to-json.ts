import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

export const visible = createReducer<boolean>(
  {
    SHOW_EXPORT_TO_JSON: () => true,
    CANCEL_EXPORT_TO_JSON: () => false,
  },
  false
);

export const exportToJson = combineReducers({ visible });
