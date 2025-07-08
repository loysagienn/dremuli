import { NapEvent, NapEventType } from "types";

function isBetween(hour: number, fromHour: number, toHour: number) {
  let marker = fromHour;

  if (hour === toHour) {
    return true;
  }

  while (marker !== toHour) {
    if (hour === marker) {
      return true;
    }

    marker += 1;

    if (marker === 24) {
      marker = 0;
    }
  }

  return false;
}

function isBetweenHours(event: NapEvent, fromHour: number, toHour: number) {
  let marker = event.time.getHours();
  const endHour = event.endTime.getHours();

  if (isBetween(endHour, fromHour, toHour)) {
    return true;
  }

  while (marker !== endHour) {
    if (isBetween(marker, fromHour, toHour)) {
      return true;
    }

    marker += 1;

    if (marker === 24) {
      marker = 0;
    }
  }

  return false;
}

const NIGHT_SLEEP_TRESHOLD = 1000 * 60 * 30; // 30 mins

function addNightSleepBefore(events: NapEvent[], index: number) {
  if (index < 2) {
    return;
  }
  const awake = events[index - 1];
  const sleep = events[index - 2];

  if (sleep.isNightSleep) {
    return;
  }

  let isNight = false;

  if (
    isBetweenHours(sleep, 22, 0) &&
    awake.duration < NIGHT_SLEEP_TRESHOLD * 2
  ) {
    isNight = true;
  }

  if (
    !isNight &&
    isBetweenHours(sleep, 20, 22) &&
    awake.duration < NIGHT_SLEEP_TRESHOLD
  ) {
    isNight = true;
  }

  if (
    !isNight &&
    isBetweenHours(sleep, 18, 20) &&
    awake.duration < NIGHT_SLEEP_TRESHOLD / 2
  ) {
    isNight = true;
  }

  if (isNight) {
    sleep.isNightSleep = true;

    addNightSleepBefore(events, index - 2);
  }
}

function addNightSleepAfter(events: NapEvent[], index: number) {
  const event = events[index];

  if (!event.isNightSleep) {
    return;
  }

  if (index + 2 >= events.length) {
    return;
  }

  const awake = events[index + 1];
  const sleep = events[index + 2];

  if (sleep.isNightSleep) {
    return;
  }

  let isNight = false;

  if (isBetweenHours(sleep, 4, 6) && awake.duration < NIGHT_SLEEP_TRESHOLD) {
    isNight = true;
  }

  if (
    !isNight &&
    isBetweenHours(sleep, 6, 8) &&
    awake.duration < NIGHT_SLEEP_TRESHOLD / 2
  ) {
    isNight = true;
  }

  if (isNight) {
    sleep.isNightSleep = true;
  }
}

export function labelNightEvents(events: NapEvent[]) {
  for (let i = 0; i < events.length - 1; i++) {
    const event = events[i];

    if (event.type === NapEventType.Sleep && isBetweenHours(event, 0, 4)) {
      event.isNightSleep = true;
    }
  }

  let isNight = false;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    if (event.type !== NapEventType.Sleep) {
      continue;
    }

    if (event.isNightSleep && !isNight) {
      addNightSleepBefore(events, i);

      isNight = true;
    }

    if (!event.isNightSleep) {
      isNight = false;
    }
  }

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    if (event.type !== NapEventType.Sleep) {
      continue;
    }

    if (event.isNightSleep) {
      addNightSleepAfter(events, i);
    }
  }

  if (events.length > 0) {
    const lastEvent = events[events.length - 1];

    if (
      lastEvent.type === NapEventType.Sleep &&
      !lastEvent.isNightSleep &&
      isBetweenHours(lastEvent, 21, 0)
    ) {
      lastEvent.isNightSleep = true;
    }
  }
}
