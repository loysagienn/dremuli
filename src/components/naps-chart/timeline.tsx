import React, { memo, useCallback, useMemo, useRef } from "react";
import styles from "./naps-chart.module.css";
import {
  InfiniteScroll,
  initInfiniteScrollController,
} from "components/scrolling";
import { useStore } from "@nanostores/react";
import { useSelector } from "react-redux";
import { selectCurrentDay } from "selectors";
import { DayNaps } from "./day-naps";

type TimelineProps = {
  height: number;
  width: number;
  headerHeight: number;
};

const MAX_DAY_WIDTH = 120;
const MIN_DAY_WIDTH = 68;

function useDateByDiff() {
  const datesByDiff = useRef<{ [key: number]: Date }>({});
  const currentDay = useSelector(selectCurrentDay);
  const currentDayRef = useRef<Date>(currentDay);

  if (currentDay !== currentDayRef.current) {
    currentDayRef.current = currentDay;
    datesByDiff.current = {};
  }

  const getDateByDiff = useCallback(
    (diff: number) => {
      if (datesByDiff.current[diff]) {
        return datesByDiff.current[diff];
      }

      const date = new Date(currentDay);
      date.setDate(date.getDate() + diff);

      datesByDiff.current[diff] = date;

      return date;
    },
    [currentDay]
  );

  return getDateByDiff;
}

function Timeline({ width, height, headerHeight }: TimelineProps) {
  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "horizontal",
        maxValue: 0,
        scale: 1,
      }),
    []
  );
  const getDateByDiff = useDateByDiff();
  const value = useStore(scrollController.$value);
  const dayWidth = Math.max(Math.min(MAX_DAY_WIDTH, width / 10), MIN_DAY_WIDTH);

  const daysCount = Math.ceil(width / dayWidth);

  const daysDiffs = useMemo(() => {
    const firstDayDiff = Math.ceil(value / dayWidth);

    let daysDiffs: number[] = [];

    for (let i = 0; i <= daysCount; i++) {
      daysDiffs.push(firstDayDiff - i);
    }

    return daysDiffs;
  }, [value]);

  return (
    <InfiniteScroll
      scrollController={scrollController}
      className={styles.timeline}
    >
      {daysDiffs.map((dayDiff) => {
        const date = getDateByDiff(dayDiff);
        const right = value - dayDiff * dayWidth;
        const width = dayWidth;

        return (
          <div className={styles.day} style={{ right, width }} key={dayDiff}>
            <DayNaps
              date={date}
              height={height}
              headerHeight={headerHeight}
              dayWidth={dayWidth}
            />
          </div>
        );
      })}
    </InfiniteScroll>
  );
}

const EnhancedTimeline = memo(Timeline);

export { EnhancedTimeline as Timeline };
