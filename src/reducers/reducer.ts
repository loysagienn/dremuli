import { combineReducers } from "redux";
import { router } from "./router";
import { sessionSettings } from "./session-settings";
import { user } from "./user";
import { currentTime } from "./current-time";
import { activeDay } from "./active-day";
import { pageVisibility } from "./page-visibility";
import { admin } from "./admin";
import { events } from "./events";

export const reducer = combineReducers({
  router,
  sessionSettings,
  user,
  currentTime,
  activeDay,
  pageVisibility,
  admin,
  events,
});

export type State = ReturnType<typeof reducer>;
