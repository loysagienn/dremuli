import { combineReducers } from "redux";
import { router } from "./router";
import { userSettings } from "./user-settings";
import { user } from "./user";
import { naps } from "./naps";

export const reducer = combineReducers({ router, userSettings, user, naps });

export type State = ReturnType<typeof reducer>;
