import { State, NapEvent, NapEventType } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectTimeZone } from "./session-settings";
import { formatDate, formatDuration, formatTime } from "utils/date";
import { selectRoute } from "./router";
import { selectCurrentTime } from "./current-time";

export const selectNaps = (state: State) => state.naps;

export const selectNapsReverse = createSelector(selectNaps, (naps) =>
  naps.slice().reverse()
);

export const selectRouteNap = createSelector(
  selectNaps,
  selectRoute,
  (naps, route) => {
    if (route.key !== "update_nap") {
      return null;
    }

    const nap = naps.find((nap) => nap.id === route.napId);

    return nap ?? null;
  }
);

export const selectNapEvents = createSelector(
  selectNapsReverse,
  selectTimeZone,
  selectCurrentTime,
  (naps, timeZone, currentTime) => {
    const events: NapEvent[] = [];

    const getSleepEndTime = (index: number) => {
      const nap = naps[index];

      if (nap.endTime) {
        return nap.endTime;
      }

      if (index + 1 < naps.length) {
        const nextNap = naps[index + 1];

        return nextNap.startTime;
      }

      return currentTime;
    };

    const getAwakeEndTime = (index: number) => {
      if (index + 1 < naps.length) {
        const nextNap = naps[index + 1];

        return nextNap.startTime;
      }

      return currentTime;
    };

    for (let i = 0; i < naps.length; i++) {
      const nap = naps[i];
      const { startTime, endTime } = nap;

      const sleepEndTime = getSleepEndTime(i);
      const awakeEndTime = getAwakeEndTime(i);

      let sleepDuration = sleepEndTime.getTime() - startTime.getTime();

      if (sleepDuration < 0) {
        sleepDuration = 0;
      }

      events.push({
        id: `${nap.id}_start`,
        nap,
        type: NapEventType.Sleep,
        time: startTime,
        timeStr: formatTime(startTime, timeZone),
        duration: sleepDuration,
        durationStr: formatDuration(sleepDuration),
      });

      if (endTime) {
        let awakeDuration = awakeEndTime.getTime() - endTime.getTime();

        if (awakeDuration < 0) {
          awakeDuration = 0;
        }

        events.push({
          id: `${nap.id}_end`,
          nap,
          type: NapEventType.Awake,
          time: endTime,
          timeStr: formatTime(endTime, timeZone),
          duration: awakeDuration,
          durationStr: formatDuration(awakeDuration),
        });
      }
    }

    for (let i = 1; i < events.length; i++) {
      const prev = events[i - 1];
      const event = events[i];

      if (prev.time.getDate() !== event.time.getDate()) {
        event.dayStartStr = formatDate(event.time, timeZone);
      }
    }

    return events;
  }
);
