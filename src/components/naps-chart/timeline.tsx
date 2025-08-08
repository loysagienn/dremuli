import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./naps-chart.module.css";
import {
  InfiniteScroll,
  InfiniteScrollController,
  initInfiniteScrollController,
} from "components/scrolling";
import { useSelector } from "react-redux";
import { selectCurrentDay, selectLanguage } from "selectors";
import { DayNaps } from "./day-naps";
import { useQuant, computedQuant } from "utils/quant";
import { formatDate } from "utils/date";

type TimelineProps = {
  height: number;
  width: number;
  headerHeight: number;
};

const MAX_DAY_WIDTH = 120;
const MIN_DAY_WIDTH = 68;
const HOUR_MS = 1000 * 60 * 60;

function initChartState(
  width: number,
  scrollController: InfiniteScrollController,
  currentDay: Date
) {
  const datesByDiff: { [key: number]: Date } = {};

  const $dayWidth = computedQuant([scrollController.$scale], (scale) => {
    return (HOUR_MS * 24) / scale;
  });

  const $daysCount = computedQuant([$dayWidth], (dayWidth) => {
    return Math.ceil(width / dayWidth) + 1;
  });

  const $daysDiffs = computedQuant(
    [scrollController.$value, $daysCount],
    (value, daysCount) => {
      const firstDayDiff = Math.ceil(value / (HOUR_MS * 24)) + 1;

      let daysDiffs: number[] = [];

      for (let i = 0; i <= daysCount; i++) {
        daysDiffs.push(firstDayDiff - i);
      }

      return daysDiffs;
    }
  );

  const getDateByDiff = (diff: number) => {
    if (datesByDiff[diff]) {
      return datesByDiff[diff];
    }

    const date = new Date(currentDay);
    date.setDate(date.getDate() + diff);

    datesByDiff[diff] = date;

    return date;
  };

  const $days = computedQuant(
    [$daysDiffs, scrollController.$value, scrollController.$scale, $dayWidth],
    (daysDiffs, value, scale, dayWidth) => {
      return daysDiffs.map((dayDiff) => {
        const date = getDateByDiff(dayDiff);
        const right = value / scale - (dayDiff - 0.5) * dayWidth;

        return { date, right, dayDiff };
      });
    }
  );

  const $headerDays = computedQuant([$days, $dayWidth], (days, dayWidth) => {
    if (dayWidth > 95) {
      return days;
    }

    const skipFactor = Math.ceil(95 / dayWidth);

    const headerDays = days.filter((day) => day.dayDiff % skipFactor === 0);

    return headerDays;
  });

  const $headerDayWidth = computedQuant([$dayWidth], (dayWidth) => {
    if (dayWidth > 95) {
      return dayWidth;
    }

    const skipFactor = Math.ceil(95 / dayWidth);

    return skipFactor * dayWidth;
  });

  const destroy = () => {
    $dayWidth.destroy();
    $headerDayWidth.destroy();
    $headerDays.destroy();
    $days.destroy();
    $daysDiffs.destroy();
    $daysCount.destroy();
  };

  return {
    $dayWidth,
    $daysDiffs,
    $days,
    $headerDays,
    $headerDayWidth,
    destroy,
  };
}

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
  const currentDay = useSelector(selectCurrentDay);
  const lang = useSelector(selectLanguage);

  const defaultScale = useMemo(() => {
    const dayWidth = Math.max(
      Math.min(MAX_DAY_WIDTH, width / 10),
      MIN_DAY_WIDTH
    );

    return (HOUR_MS * 24) / dayWidth;
  }, []);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "horizontal",
        scale: defaultScale,
        maxValue: 0,
        defaultValue: 0,
        scalingEnabled: true,
      }),
    []
  );

  useEffect(
    () => () => {
      scrollController.destroy();
    },
    [scrollController]
  );

  const chartState = useMemo(
    () => initChartState(width, scrollController, currentDay),
    [width, scrollController, currentDay]
  );

  useEffect(
    () => () => {
      chartState.destroy();
    },
    [chartState]
  );

  const { $headerDays, $headerDayWidth, $dayWidth, $days } = chartState;

  const headerDays = useQuant($headerDays);
  const headerDayWidth = useQuant($headerDayWidth);
  const dayWidth = useQuant($dayWidth);
  const days = useQuant($days);

  // const getDateByDiff = useDateByDiff();
  // const value = useQuant(scrollController.$value);
  // const dayWidth = Math.max(Math.min(MAX_DAY_WIDTH, width / 10), MIN_DAY_WIDTH);

  // const daysCount = Math.ceil(width / dayWidth);

  // const daysDiffs = useMemo(() => {
  //   const firstDayDiff = Math.ceil(value / dayWidth);

  //   let daysDiffs: number[] = [];

  //   for (let i = 0; i <= daysCount; i++) {
  //     daysDiffs.push(firstDayDiff - i);
  //   }

  //   return daysDiffs;
  // }, [value]);

  return (
    <InfiniteScroll
      scrollController={scrollController}
      className={styles.timeline}
    >
      {headerDays.map(({ date, right }) => {
        return (
          <div
            className={styles.dayHeader}
            style={{
              right: right - headerDayWidth / 2,
              width: headerDayWidth,
            }}
            key={date.getTime()}
          >
            {formatDate(date, { lang })}
          </div>
        );
      })}
      {days.map(({ date, right }) => {
        return (
          <div
            className={styles.day}
            style={{ right: right - dayWidth / 2, width: dayWidth }}
            key={date.getTime()}
          >
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
