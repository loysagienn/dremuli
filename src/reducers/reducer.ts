import { combineReducers } from "redux";
import { router } from "./router";
import { settings } from "./settings";
import { user } from "./user";
import { currentTime } from "./current-time";
import { activeDay } from "./active-day";
import { pageVisibility } from "./page-visibility";
import { admin } from "./admin";
import { events } from "./events";
import { windowSize } from "./window-size";
import { exportToJson } from "./export-to-json";
import { importFromJson } from "./import-from-json";

export const reducer = combineReducers({
  router,
  settings,
  user,
  currentTime,
  activeDay,
  pageVisibility,
  admin,
  events,
  windowSize,
  exportToJson,
  importFromJson,
});

export type State = ReturnType<typeof reducer>;
