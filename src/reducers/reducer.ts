import { combineReducers } from "redux";
import { router } from "./router";
import { sessionSettings } from "./session-settings";
import { user } from "./user";
import { naps } from "./naps";

export const reducer = combineReducers({ router, sessionSettings, user, naps });

export type State = ReturnType<typeof reducer>;
