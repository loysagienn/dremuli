import { combineReducers } from "redux";
import { router } from "./router";
import { sessionSettings } from "./session-settings";
import { user } from "./user";
import { naps } from "./naps";
import { currentTime } from "./current-time";
import { activeDay } from "./active-day";
import { pageVisibility } from "./page-visibility";

export const reducer = combineReducers({
  router,
  sessionSettings,
  user,
  naps,
  currentTime,
  activeDay,
  pageVisibility,
});

export type State = ReturnType<typeof reducer>;
