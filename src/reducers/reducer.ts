import { combineReducers } from "redux";
import { router } from "./router";
import { sessionSettings } from "./session-settings";
import { user } from "./user";
import { naps } from "./naps";
import { currentTime } from "./current-time";
import { activeDay } from "./active-day";

export const reducer = combineReducers({
  router,
  sessionSettings,
  user,
  naps,
  currentTime,
  activeDay,
});

export type State = ReturnType<typeof reducer>;
