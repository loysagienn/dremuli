import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectNapEvents } from "./events";
import { selectActiveTimezone } from "./timezone";
import { getDayStat } from "utils/nap-events";

export const selectActiveDay = (state: State) => state.activeDay;

export const selectActiveDayStat = createSelector(
  selectActiveDay,
  selectActiveTimezone,
  selectNapEvents,
  (activeDay, timeZone, napEvents) => {
    if (!activeDay || napEvents.length === 0) {
      return;
    }

    return getDayStat(activeDay, napEvents, timeZone);
  }
);
