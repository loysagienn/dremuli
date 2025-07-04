import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

const theme = createReducer<"light" | "dark">(
  {
    SET_THEME: (state, { theme }) => theme,
  },
  null
);

const timeZone = createReducer<string>(
  {
    SET_TIME_ZONE: (state, { timeZone }) => timeZone,
  },
  ""
);

export const sessionSettings = combineReducers({ theme, timeZone });
