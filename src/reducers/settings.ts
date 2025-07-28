import { combineReducers } from "redux";
import { Lang } from "types";
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

const language = createReducer<Lang>(
  {
    SET_LANGUAGE: (state, { language }) => language,
    SET_USER: (state, { userSettings }) => userSettings?.language ?? state,
  },
  "en"
);

export const settings = combineReducers({ theme, timeZone, language });
