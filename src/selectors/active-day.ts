import { State, NapEvent, NapEventType } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectTimeZone } from "./session-settings";
import { formatDate, formatDuration, formatTime } from "utils/date";
import { selectRoute } from "./router";
import { selectCurrentTime } from "./current-time";
import { selectNapEvents } from "./events";

export const selectActiveDay = (state: State) => state.activeDay;

function findFirstNightSleep(napEvents: NapEvent[], dayStart: Date) {
  const timestamp = dayStart.getTime();

  let index = napEvents.findIndex(
    (event) =>
      event.isNightSleep && event.endTime && event.endTime.getTime() > timestamp
  );

  if (index === -1) {
    return null;
  }

  let i = index - 1;

  while (i >= 0) {
    const event = napEvents[i];

    if (event.type === NapEventType.Awake) {
      i -= 1;
      continue;
    }

    if (event.isNightSleep) {
      index = i;
      i -= 1;
      continue;
    }

    return index;
  }

  return index;
}

function calculateStat(napEvents: NapEvent[], firstNightSleepIndex: number) {
  let index = firstNightSleepIndex;

  let dayStarted = false;

  let nightSleepDuration = 0;
  let nightAwakeDuration = 0;
  let daySleepDuration = 0;
  let dayAwakeDuration = 0;
  let dayNapsCount = 0;

  while (index < napEvents.length) {
    const event = napEvents[index];
    const nextEvent =
      index + 1 < napEvents.length ? napEvents[index + 1] : null;

    if (event.isNightSleep) {
      if (dayStarted && event.time.getHours() > 15) {
        break;
      }

      nightSleepDuration += event.duration;
    } else if (event.type === NapEventType.Awake) {
      if (!dayStarted && nextEvent && nextEvent.isNightSleep) {
        nightAwakeDuration += event.duration;
      } else {
        dayStarted = true;
        dayAwakeDuration += event.duration;
      }
    } else if (event.type === NapEventType.Sleep) {
      daySleepDuration += event.duration;
      dayNapsCount += 1;
    }

    index += 1;
  }

  const totalSleepDuration = nightSleepDuration + daySleepDuration;

  return {
    totalSleepDuration,
    nightSleepDuration,
    nightAwakeDuration,
    daySleepDuration,
    dayAwakeDuration,
    dayNapsCount,
  };
}

export const selectActiveDayStat = createSelector(
  selectCurrentTime,
  selectActiveDay,
  selectNapEvents,
  (currentTime, activeDay, napEvents) => {
    if (!activeDay || !currentTime || napEvents.length === 0) {
      return;
    }

    const dayStart = new Date(activeDay);

    dayStart.setHours(0);
    dayStart.setMinutes(0);

    const firstNightSleepIndex = findFirstNightSleep(napEvents, dayStart);

    if (firstNightSleepIndex === null) {
      return null;
    }

    const stat = calculateStat(napEvents, firstNightSleepIndex);

    return stat;
  }
);
