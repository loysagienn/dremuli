import { combineReducers } from "redux";
import { router } from "./router";
import { sessionSettings } from "./session-settings";
import { user } from "./user";
import { naps } from "./naps";
import { currentTime } from "./current-time";

export const reducer = combineReducers({
  router,
  sessionSettings,
  user,
  naps,
  currentTime,
});

export type State = ReturnType<typeof reducer>;
