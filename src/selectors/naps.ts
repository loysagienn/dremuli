import { State, NapEvent, NapEventType } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectTimeZone } from "./session-settings";
import { formatDuration, formatTime } from "utils/date";

export const selectNaps = (state: State) => state.naps;

export const selectNapsReverse = createSelector(selectNaps, (naps) =>
  naps.slice().reverse()
);

export const selectNapEvents = createSelector(
  selectNapsReverse,
  selectTimeZone,
  (naps, timeZone) => {
    const events: NapEvent[] = [];
    const now = new Date();

    const getSleepEndTime = (index: number) => {
      const nap = naps[index];

      if (nap.endTime) {
        return nap.endTime;
      }

      if (index + 1 < naps.length) {
        const nextNap = naps[index + 1];

        return nextNap.startTime;
      }

      return now;
    };

    const getAwakeEndTime = (index: number) => {
      if (index + 1 < naps.length) {
        const nextNap = naps[index + 1];

        return nextNap.startTime;
      }

      return now;
    };

    for (let i = 0; i < naps.length; i++) {
      const nap = naps[i];
      const { startTime, endTime } = nap;

      const sleepEndTime = getSleepEndTime(i);
      const awakeEndTime = getAwakeEndTime(i);

      const sleepDuration = sleepEndTime.getTime() - startTime.getTime();

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
        const awakeDuration = awakeEndTime.getTime() - endTime.getTime();

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

    return events;
  }
);
