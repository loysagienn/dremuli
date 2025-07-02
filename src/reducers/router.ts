import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";
import { AppRoute } from "app/router";

const route = createReducer<AppRoute>(
  {
    ROUTE_TO: (state, { route }) => route,
  },
  null
);

export const router = combineReducers({ route });
