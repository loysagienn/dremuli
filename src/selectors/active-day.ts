import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectNapEvents } from "./events";
import { getDayStat } from "utils/nap-events";

export const selectActiveDay = (state: State) => state.activeDay;

export const selectActiveDayStat = createSelector(
  selectActiveDay,
  selectNapEvents,
  (activeDay, napEvents) => {
    if (!activeDay || napEvents.length === 0) {
      return;
    }

    return getDayStat(activeDay, napEvents);
  }
);
