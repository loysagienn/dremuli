import { NapEvent, EventType } from "types";
import { getDayStart } from "utils/date";

const HOUR_MS = 1000 * 60 * 60;

function findFirstNightSleep(napEvents: NapEvent[], dayStart: Date) {
  const timestamp = dayStart.getTime();
  const searchEndTimestamp = timestamp + 15 * HOUR_MS;

  let index = napEvents.findIndex((event) => {
    if (!event.isNightSleep || !event.endTime) {
      return false;
    }

    const endTimestamp = event.endTime.getTime();

    return endTimestamp > timestamp && endTimestamp < searchEndTimestamp;
  });

  if (index === -1) {
    return null;
  }

  let i = index - 1;

  while (i >= 0) {
    const event = napEvents[i];

    if (event.type === EventType.WokeUp) {
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

export type DayStat = {
  totalSleepDuration: number;
  nightSleepDuration: number;
  nightAwakeDuration: number;
  daySleepDuration: number;
  dayAwakeDuration: number;
  dayNapsCount: number;
};

function calculateStat(
  napEvents: NapEvent[],
  firstNightSleepIndex: number
): DayStat {
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

    if (!nextEvent && event.duration > HOUR_MS * 24) {
      break;
    }

    if (event.isNightSleep) {
      if (dayStarted && event.timestamp.getHours() > 15) {
        break;
      }

      nightSleepDuration += event.duration;
    } else if (event.type === EventType.WokeUp) {
      if (!dayStarted && nextEvent && nextEvent.isNightSleep) {
        nightAwakeDuration += event.duration;
      } else {
        dayStarted = true;
        dayAwakeDuration += event.duration;
      }
    } else if (event.type === EventType.FellAsleep) {
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

export function getDayStat(day: Date, napEvents: NapEvent[]) {
  const dayStart = getDayStart(day);

  const firstNightSleepIndex = findFirstNightSleep(napEvents, dayStart);

  if (firstNightSleepIndex === null) {
    return null;
  }

  const stat = calculateStat(napEvents, firstNightSleepIndex);

  return stat;
}
