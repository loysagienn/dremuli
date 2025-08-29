import React from "react";
import styles from "./events-list-page.module.css";
import { InfiniteScrollController } from "components/scrolling";
import { selectNapEvents } from "selectors";
import { useSelector } from "react-redux";
import { useQuant } from "utils/quant";
import { NapEvent } from "types";
import {
  FOOTER_HEIGHT,
  PADDING,
  EVENT_HEIGHT,
  DAY_START_HEIGHT,
  DAY_START_PADDING,
} from "./constants";
import { NapEventContent } from "./nap-event-content";

type EventsListProps = {
  scrollController: InfiniteScrollController;
  containerHeight: number;
};

type EventToRender = {
  napEvent: NapEvent;
  bottom: number;
  height: number;
  index: number;
};

function useEventsToRender(
  napEvents: NapEvent[],
  containerHeight: number,
  value: number
) {
  let bottomSpace = PADDING + FOOTER_HEIGHT;

  const eventsToRender: EventToRender[] = [];

  for (let i = napEvents.length - 1; i >= 0; i--) {
    const napEvent = napEvents[i];

    const eventSpace = napEvent.dayStartStr
      ? DAY_START_HEIGHT + DAY_START_PADDING + EVENT_HEIGHT
      : EVENT_HEIGHT;

    if (bottomSpace + value + eventSpace > 0) {
      eventsToRender.push({
        napEvent,
        bottom: bottomSpace + value,
        height: EVENT_HEIGHT,
        index: i,
      });
    }

    bottomSpace += eventSpace;

    if (bottomSpace + value > containerHeight) {
      break;
    }
  }

  return eventsToRender;
}

function useDayStarts(
  eventsToRender: EventToRender[],
  napEvents: NapEvent[],
  containerHeight: number,
  value: number
) {
  const dayStarts: { dayStartStr: string; bottom: number }[] = [];

  for (let i = 0; i < eventsToRender.length; i++) {
    const { napEvent, bottom } = eventsToRender[i];

    if (napEvent.dayStartStr) {
      let dayStartBottom = bottom + EVENT_HEIGHT + DAY_START_PADDING;

      if (dayStartBottom + DAY_START_HEIGHT > containerHeight) {
        dayStartBottom = containerHeight - DAY_START_HEIGHT;
      }

      dayStarts.push({
        dayStartStr: napEvent.dayStartStr,
        bottom: dayStartBottom,
      });
    }
  }

  let lastEventIndex = eventsToRender[eventsToRender.length - 1].index;
  let lastNapEvent = napEvents[lastEventIndex];

  while (lastNapEvent && !lastNapEvent.dayStartStr) {
    lastEventIndex--;
    lastNapEvent = napEvents[lastEventIndex];

    if (lastNapEvent?.dayStartStr) {
      dayStarts.push({
        dayStartStr: lastNapEvent.dayStartStr,
        bottom: containerHeight - DAY_START_HEIGHT,
      });
    }
  }

  return dayStarts.reverse();
}

export function EventsList({
  scrollController,
  containerHeight,
}: EventsListProps) {
  // console.log("render events list");
  const napEvents = useSelector(selectNapEvents);
  const value = useQuant(scrollController.$value);

  const eventsToRender = useEventsToRender(napEvents, containerHeight, value);
  const dayStarts = useDayStarts(
    eventsToRender,
    napEvents,
    containerHeight,
    value
  );

  let sideLineBottom = FOOTER_HEIGHT + PADDING + value;

  if (sideLineBottom < 0) {
    sideLineBottom = 0;
  }

  return (
    <>
      <div className={styles.sideLine} style={{ bottom: sideLineBottom }} />

      {eventsToRender.map(({ napEvent, bottom, height }) => (
        <div
          className={styles.napEvent}
          style={{ bottom, height }}
          key={napEvent.id}
        >
          <NapEventContent napEvent={napEvent} />
        </div>
      ))}
      {dayStarts.map(({ dayStartStr, bottom }) => (
        <div className={styles.dayStart} style={{ bottom }} key={dayStartStr}>
          {dayStartStr}
        </div>
      ))}

      {eventsToRender.map(({ napEvent, bottom, height }) => (
        <div
          className={styles.napEventDot}
          style={{ bottom: bottom + height - 21 }}
          key={napEvent.id}
        />
      ))}
    </>
  );
}
