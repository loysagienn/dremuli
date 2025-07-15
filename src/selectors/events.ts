import { State, NapEvent, NapEventType } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectTimeZone } from "./session-settings";
import { formatDate, formatDuration, formatTime } from "utils/date";
import { selectRoute } from "./router";
import { selectCurrentTime } from "./current-time";
import { labelNightEvents } from "./label-night-events";

export const selectEvents = (state: State) => state.events;

export const selectEventsReverse = createSelector(selectEvents, (events) =>
  events.slice().reverse()
);

export const selectRouteEvent = createSelector(
  selectEvents,
  selectRoute,
  (events, route) => {
    if (route.key !== "update_event") {
      return null;
    }

    const event = events.find((event) => event.id === route.eventId);

    return event ?? null;
  }
);

export const selectNapEvents = createSelector(
  selectEventsReverse,
  selectTimeZone,
  selectCurrentTime,
  (events, timeZone, currentTime) => {
    const napEvents: NapEvent[] = [];

    const getEndTime = (index: number) => {
      if (index + 1 < events.length) {
        const nextEvent = events[index + 1];

        return nextEvent.timestamp;
      }

      return currentTime;
    };

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const { type, timestamp } = event;

      const endTime = getEndTime(i);

      let duration = endTime.getTime() - timestamp.getTime();

      if (duration < 0) {
        duration = 0;
      }

      napEvents.push({
        id: `${event.id}_nap`,
        event,
        type:
          event.type === "fell_asleep"
            ? NapEventType.Sleep
            : NapEventType.Awake,
        time: timestamp,
        endTime: endTime,
        timeStr: formatTime(timestamp, timeZone),
        duration,
        durationStr: formatDuration(duration),
        isNightSleep: false,
      });
    }

    if (napEvents.length > 0) {
      napEvents[0].dayStartStr = formatDate(napEvents[0].time, timeZone);
    }

    for (let i = 1; i < napEvents.length; i++) {
      const prev = napEvents[i - 1];
      const event = napEvents[i];

      if (prev.time.getDate() !== event.time.getDate()) {
        event.dayStartStr = formatDate(event.time, timeZone);
      }
    }

    labelNightEvents(napEvents);

    return napEvents;
  }
);

export const selectLastEvent = createSelector(selectNapEvents, (napEvents) => {
  if (napEvents.length === 0) {
    return null;
  }

  return napEvents[napEvents.length - 1];
});

export const selectNextEventType = createSelector(
  selectLastEvent,
  (lastEvent) => {
    if (!lastEvent) {
      return NapEventType.Sleep;
    }

    return lastEvent.type === NapEventType.Sleep
      ? NapEventType.Awake
      : NapEventType.Sleep;
  }
);
