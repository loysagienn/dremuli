import React, { memo, useEffect, useMemo, useRef } from "react";
import styles from "./naps-chart.module.css";
import {
  InfiniteScroll,
  initInfiniteScrollController,
} from "components/scrolling";
import { useSelector } from "react-redux";
import { selectCurrentDay, selectLanguage } from "selectors";
import { DayNaps } from "./day-naps";
import { useQuant } from "utils/quant";
import { formatDate } from "utils/date";
import { initChartState } from "./chart-state";
import { initMouseController } from "./mouse-controller";
import { MouseContent } from "./mouse-content";

type TimelineProps = {
  height: number;
  width: number;
  headerHeight: number;
};

const MAX_DAY_WIDTH = 120;
const MIN_DAY_WIDTH = 68;
const HOUR_MS = 1000 * 60 * 60;

function Timeline({ width, height, headerHeight }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentDay = useSelector(selectCurrentDay);
  const lang = useSelector(selectLanguage);

  const defaultScale = useMemo(() => {
    const dayWidth = Math.max(
      Math.min(MAX_DAY_WIDTH, width / 15),
      MIN_DAY_WIDTH
    );

    return (HOUR_MS * 24) / dayWidth;
  }, []);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "horizontal",
        scale: defaultScale,
        maxValue: HOUR_MS * 24 * 3,
        defaultValue: HOUR_MS * 24,
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

  const mouseController = useMemo(
    () =>
      initMouseController(
        scrollController,
        width,
        height,
        headerHeight,
        containerRef
      ),
    [scrollController, width, height, headerHeight, containerRef]
  );

  useEffect(
    () => () => {
      mouseController.destroy();
    },
    [mouseController]
  );

  const mouseTime = useQuant(mouseController.$mouseTime);

  const { $headerDays, $headerDayWidth, $dayWidth, $days } = chartState;

  const headerDays = useQuant($headerDays);
  const headerDayWidth = useQuant($headerDayWidth);
  const dayWidth = useQuant($dayWidth);
  const days = useQuant($days);

  return (
    <div className={styles.timelineContainer} ref={containerRef}>
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
                width={width}
                headerHeight={headerHeight}
                dayWidth={dayWidth}
                mouseController={mouseController}
              />
            </div>
          );
        })}
      </InfiniteScroll>
      <MouseContent
        mouseController={mouseController}
        height={height}
        headerHeight={headerHeight}
        width={width}
      />
    </div>
  );
}

const EnhancedTimeline = memo(Timeline);

export { EnhancedTimeline as Timeline };
