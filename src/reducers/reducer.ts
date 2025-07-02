import { combineReducers } from "redux";
import { router } from "./router";
import { userSettings } from "./user-settings";
import { user } from "./user";

export const reducer = combineReducers({ router, userSettings, user });

export type State = ReturnType<typeof reducer>;
