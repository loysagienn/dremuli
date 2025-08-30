import React, { ReactNode, useMemo } from "react";
import styles from "./events-list-page.module.css";
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
import { ScrollController } from "components/scroll-content";

type EventsListProps = {
  scrollController: ScrollController;
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

function useEventsOffsets(napEvents: NapEvent[]) {
  return useMemo(() => {
    const offsets: number[] = [];
    let offset = -PADDING - FOOTER_HEIGHT;

    for (let i = napEvents.length - 1; i >= 0; i--) {
      const napEvent = napEvents[i];

      offsets.unshift(offset - EVENT_HEIGHT);

      offset -= napEvent.dayStartStr
        ? EVENT_HEIGHT + DAY_START_HEIGHT + DAY_START_PADDING
        : EVENT_HEIGHT;
    }

    return offsets;
  }, [napEvents]);
}

export function EventsList({
  scrollController,
  containerHeight,
}: EventsListProps) {
  // console.log("render events list");
  const napEvents = useSelector(selectNapEvents);
  const offsets = useEventsOffsets(napEvents);

  const value = useQuant(scrollController.$value);
  const [rangeStart, rangeEnd] = useQuant(scrollController.$visibleRangeValue);
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const [renderStartIndex, renderEndIndex] = useMemo(() => {
    let startIndex = 0;

    while (
      offsets[startIndex] + EVENT_HEIGHT < rangeStart &&
      startIndex < offsets.length - 1
    ) {
      startIndex++;
    }

    let endIndex = startIndex;

    while (offsets[endIndex] < rangeEnd && endIndex < offsets.length - 1) {
      endIndex++;
    }

    return [startIndex, endIndex];
  }, [rangeStart, rangeEnd, offsets]);

  const dateStartIndexes = useMemo(() => {
    const indexes: number[] = [];

    for (let i = renderEndIndex; i >= renderStartIndex; i--) {
      const napEvent = napEvents[i];

      if (napEvent.dayStartStr) {
        indexes.push(i);
      }
    }

    if (napEvents[renderStartIndex].dayStartStr) {
      return indexes;
    }

    let start = renderStartIndex - 1;

    while (start >= 0 && !napEvents[start].dayStartStr) {
      start -= 1;
    }

    if (start >= 0) {
      indexes.push(start);
    }

    return indexes;
  }, [renderStartIndex, renderEndIndex, napEvents]);

  const eventsContent: ReactNode[] = [];

  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const napEvent = napEvents[i];
    const offset = offsets[i];

    const top = offset - scrollStartValue;

    eventsContent.push(
      <div className={styles.napEvent} style={{ top }} key={napEvent.id}>
        <NapEventContent napEvent={napEvent} />
      </div>
    );
  }

  const dotsContent: ReactNode[] = [];

  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const napEvent = napEvents[i];
    const offset = offsets[i];

    const top = offset - scrollStartValue;

    dotsContent.push(
      <div
        className={styles.napEventDot}
        style={{ top: top + 7 }}
        key={napEvent.id}
      />
    );
  }

  // console.log({ renderStartIndex, renderEndIndex });

  // const eventsToRender = useEventsToRender(napEvents, containerHeight, value);
  // const dayStarts = useDayStarts(
  //   eventsToRender,
  //   napEvents,
  //   containerHeight,
  //   value
  // );

  // let sideLineBottom = FOOTER_HEIGHT + PADDING + value;

  // if (sideLineBottom < 0) {
  //   sideLineBottom = 0;
  // }

  const sideLineBottom = 0;
  const sideLineHeight = -PADDING - FOOTER_HEIGHT - scrollStartValue;

  return (
    <>
      {eventsContent}
      {dateStartIndexes.map((index) => {
        const napEvent = napEvents[index];
        let offset = offsets[index] - DAY_START_PADDING - DAY_START_HEIGHT;
        if (offset < rangeStart) {
          offset = rangeStart;
        }

        const top = offset - scrollStartValue;

        return (
          <div className={styles.dayStart} style={{ top }} key={index}>
            {napEvent.dayStartStr}
          </div>
        );
      })}
      <div className={styles.sideLine} style={{ height: sideLineHeight }} />
      {dotsContent}

      {/* {eventsToRender.map(({ napEvent, bottom, height }) => (
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
      ))} */}
    </>
  );
}
