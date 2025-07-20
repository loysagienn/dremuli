import { State, EventType } from "types";
import { createSelector } from "@reduxjs/toolkit";
import { selectTimeZone } from "./session-settings";
import { getNapEvents } from "utils/nap-events";
import { selectRoute } from "./router";
import { selectCurrentTime } from "./current-time";

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
  getNapEvents
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
      return EventType.FellAsleep;
    }

    return lastEvent.type === EventType.FellAsleep
      ? EventType.WokeUp
      : EventType.FellAsleep;
  }
);
