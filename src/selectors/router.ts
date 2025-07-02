import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectRouter = (state: State) => state.router;

export const selectRoute = createSelector(
  selectRouter,
  (router) => router.route
);
