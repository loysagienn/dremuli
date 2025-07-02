import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

const theme = createReducer<"light" | "dark">(
  {
    SET_THEME: (state, { theme }) => theme,
  },
  null
);

export const userSettings = combineReducers({ theme });
