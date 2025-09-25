import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectRouter = (state: State) => state.router;

export const selectRoute = createSelector(
  selectRouter,
  (router) => router.route
);

export const selectIsSharePage = createSelector(selectRoute, (route) => {
  return (
    route?.key === "share_timeline" ||
    route?.key === "share_statistics_naps" ||
    route?.key === "share_statistics_charts"
  );
});

export const selectSharePageToken = createSelector(selectRoute, (route) => {
  if (
    route?.key === "share_timeline" ||
    route?.key === "share_statistics_naps" ||
    route?.key === "share_statistics_charts"
  ) {
    return route.token;
  }

  return null;
});
