import { NapEvent, Event, Lang } from "types";
import { formatTime, formatDate, getMonthDay } from "utils/date";
import { labelNightEvents } from "./label-night-events";

export function getNapEvents(
  events: Event[],
  timeZone: string,
  currentTime: Date,
  lang: Lang
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
    const { type, timestamp, comment } = event;

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
      isNightSleep: false,
      comment,
    });
  }

  if (napEvents.length > 0) {
    napEvents[0].dayStartStr = formatDate(napEvents[0].timestamp, {
      timeZone,
      lang,
    });
  }

  for (let i = 1; i < napEvents.length; i++) {
    const prev = napEvents[i - 1];
    const event = napEvents[i];

    if (
      getMonthDay(prev.timestamp, timeZone) !==
      getMonthDay(event.timestamp, timeZone)
    ) {
      event.dayStartStr = formatDate(event.timestamp, { timeZone, lang });
    }
  }

  labelNightEvents(napEvents, timeZone);

  return napEvents;
}
