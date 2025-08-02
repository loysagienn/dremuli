import React, { useCallback, useMemo, useRef } from "react";
import styles from "./stat-chart.module.css";
import { Size } from "types";
import { cn } from "utils/cn";
import {
  InfiniteScroll,
  initInfiniteScrollController,
} from "components/scrolling";
import { useSelector } from "react-redux";
import { selectCurrentDay, selectLanguage } from "selectors";
import { useStore } from "@nanostores/react";
import { formatDate } from "utils/date";
import { useText } from "lang/context";

type StatChartProps = {
  className?: string;
  contentSize: Size;
};

const MAX_DAY_WIDTH = 120;
const MIN_DAY_WIDTH = 68;
const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 50;
const SIDEBAR_WIDTH = 60;

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

export function StatChart({ className, contentSize }: StatChartProps) {
  const { statisticsPage: text } = useText();
  const { width, height } = contentSize;

  const lang = useSelector(selectLanguage);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "horizontal",
        maxValue: 0,
      }),
    []
  );

  const getDateByDiff = useDateByDiff();
  const value = useStore(scrollController.$value);
  const dayWidth = Math.max(Math.min(MAX_DAY_WIDTH, width / 10), MIN_DAY_WIDTH);

  const daysCount = Math.ceil(width / dayWidth) + 1;

  const daysDiffs = useMemo(() => {
    const firstDayDiff = Math.ceil(value / dayWidth);

    let daysDiffs: number[] = [];

    for (let i = 0; i <= daysCount; i++) {
      daysDiffs.push(firstDayDiff - i);
    }

    return daysDiffs;
  }, [value, daysCount]);

  return (
    <InfiniteScroll
      scrollController={scrollController}
      className={cn(className, styles.root)}
    >
      <div className={styles.header}>
        {daysDiffs.map((dayDiff) => {
          const date = getDateByDiff(dayDiff);
          const right = value - dayDiff * dayWidth;
          const width = dayWidth;

          return (
            <div
              className={styles.dayHeader}
              style={{ right, width }}
              key={dayDiff}
            >
              {formatDate(date, { lang })}
            </div>
          );
        })}
      </div>
      <div className={styles.chartContent}>{text.chartsInDevelopment}</div>
      <div className={styles.sidebar}>SB</div>
      <div className={styles.footer}>footer</div>
    </InfiniteScroll>
  );
}
