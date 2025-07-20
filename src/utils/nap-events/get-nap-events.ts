import { NapEvent, Event } from "types";
import { formatTime, formatDuration, formatDate } from "utils/date";
import { labelNightEvents } from "./label-night-events";

export function getNapEvents(
  events: Event[],
  timeZone: string,
  currentTime: Date
) {
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
      type,
      timestamp,
      endTime,
      timeStr: formatTime(timestamp, timeZone),
      duration,
      durationStr: formatDuration(duration),
      isNightSleep: false,
    });
  }

  if (napEvents.length > 0) {
    napEvents[0].dayStartStr = formatDate(napEvents[0].timestamp, timeZone);
  }

  for (let i = 1; i < napEvents.length; i++) {
    const prev = napEvents[i - 1];
    const event = napEvents[i];

    if (prev.timestamp.getDate() !== event.timestamp.getDate()) {
      event.dayStartStr = formatDate(event.timestamp, timeZone);
    }
  }

  labelNightEvents(napEvents);

  return napEvents;
}
