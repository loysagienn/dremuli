import {
  createScrollController,
  ScrollController,
} from "components/scroll-content";
import { NapEvent } from "types";
import {
  PADDING,
  FOOTER_HEIGHT,
  EVENT_HEIGHT,
  DAY_START_HEIGHT,
  DAY_START_PADDING,
} from "./constants";
import { computedQuant } from "utils/quant";

function getEventsOffsets(napEvents: NapEvent[]) {
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
}

function compareArrayValue<TValue extends any[]>(
  current: TValue,
  next: TValue
): TValue {
  if (
    current.length === next.length &&
    current.every((item, index) => item === next[index])
  ) {
    return current;
  }

  return next;
}

export function initEventsListState(
  napEvents: NapEvent[],
  scrollController: ScrollController
) {
  const { $visibleRangeValue } = scrollController;

  const offsets = getEventsOffsets(napEvents);

  const $renderRange = computedQuant(
    [$visibleRangeValue],
    ([rangeStart, rangeEnd]) => {
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

      return [startIndex, endIndex] as [number, number];
    },
    compareArrayValue
  );

  const $dayStartIndexes = computedQuant(
    [$renderRange],
    ([renderStartIndex, renderEndIndex]) => {
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
    },
    compareArrayValue
  );

  const $stickyDayStartIndexes = computedQuant(
    [$dayStartIndexes, $visibleRangeValue],
    (dayStartIndexes, [visibleRangeStart]) =>
      dayStartIndexes.filter((index) => {
        let offset = offsets[index] - DAY_START_PADDING - DAY_START_HEIGHT;

        return offset < visibleRangeStart;
      }),
    compareArrayValue
  );

  const $activeDayStartIndexes = computedQuant(
    [$dayStartIndexes, $visibleRangeValue],
    (dayStartIndexes, [visibleRangeStart]) =>
      dayStartIndexes.filter((index) => {
        let offset = offsets[index] - DAY_START_PADDING - DAY_START_HEIGHT;

        return offset >= visibleRangeStart;
      }),
    compareArrayValue
  );

  const destroy = () => {
    $stickyDayStartIndexes.destroy();
    $activeDayStartIndexes.destroy();
    $dayStartIndexes.destroy();
    $renderRange.destroy();
  };

  return {
    napEvents,
    offsets,
    scrollController,
    $renderRange,
    $stickyDayStartIndexes,
    $activeDayStartIndexes,
    destroy,
  };
}

export type EventsListState = ReturnType<typeof initEventsListState>;
