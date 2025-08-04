import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./stat-chart.module.css";
import { Lang, NapEvent, Size, Text } from "types";
import { cn } from "utils/cn";
import {
  InfiniteScroll,
  InfiniteScrollController,
  initInfiniteScrollController,
} from "components/scrolling";
import { useSelector } from "react-redux";
import {
  selectCurrentDay,
  selectLanguage,
  selectNapEvents,
  selectTheme,
} from "selectors";
import { useStore } from "@nanostores/react";
import { formatDate } from "utils/date";
import { useText } from "lang/context";
import { atom, Atom, computed } from "nanostores";
import { DayStat, getDayStat } from "utils/nap-events";
import { initAnimationController } from "utils/animation";

type StatChartProps = {
  className?: string;
  contentSize: Size;
};

const colors = {
  totalSleep: "#547ef0ff",
  nightSleep: "#d436f4",
  daySleep: "#ea9b07",
  dayAwake: "#4CAF50",
};

const MAX_DAY_WIDTH = 120;
const MIN_DAY_WIDTH = 68;
const HEADER_HEIGHT = 50;
const SIDEBAR_WIDTH = 60;

const darkBorderColor = "#38475c";
const lightBorderColor = "#a1b6d4";

function initChartState(
  contentSize: Size,
  scrollController: InfiniteScrollController,
  napEvents: NapEvent[],
  currentDay: Date
) {
  const datesByDiff: { [key: number]: Date } = {};
  const dayStatByDiff: { [key: number]: DayStat } = {};
  const { width, height } = contentSize;
  const dayWidth = Math.max(Math.min(MAX_DAY_WIDTH, width / 10), MIN_DAY_WIDTH);
  const daysCount = Math.ceil(width / dayWidth) + 1;

  const $daysDiffs = computed(scrollController.$value, (value) => {
    const firstDayDiff = Math.ceil(value / dayWidth);

    let daysDiffs: number[] = [];

    for (let i = 0; i <= daysCount; i++) {
      daysDiffs.push(firstDayDiff - i);
    }

    return daysDiffs;
  });

  const getDateByDiff = (diff: number) => {
    if (datesByDiff[diff]) {
      return datesByDiff[diff];
    }

    const date = new Date(currentDay);
    date.setDate(date.getDate() + diff);

    datesByDiff[diff] = date;

    return date;
  };

  const getStat = (diff: number, date: Date) => {
    if (dayStatByDiff[diff]) {
      return dayStatByDiff[diff];
    }

    const stat = getDayStat(date, napEvents);

    dayStatByDiff[diff] = stat;

    return stat;
  };

  const $days = computed(
    [$daysDiffs, scrollController.$value],
    (daysDiffs, value) =>
      daysDiffs.map((dayDiff) => {
        const date = getDateByDiff(dayDiff);
        const right = value - dayDiff * dayWidth;
        const stat = getStat(dayDiff, date);

        return { date, right, stat, dayDiff };
      })
  );

  return {
    dayWidth,
    $daysDiffs,
    $days,
  };
}

type ChartState = ReturnType<typeof initChartState>;

const HOUR_MS = 1000 * 60 * 60;

function initChartRenderer(
  chartState: ChartState,
  scrollController: InfiniteScrollController,
  contentSize: Size,
  canvas: HTMLCanvasElement,
  sidebarNode: HTMLDivElement,
  lang: Lang,
  theme: "light" | "dark",
  footerHeight: number,
  text: Text
) {
  const { $days, dayWidth } = chartState;
  const { $value } = scrollController;
  const height = contentSize.height - HEADER_HEIGHT - footerHeight;
  const canvasWidth = contentSize.width - SIDEBAR_WIDTH;

  const dpr = window.devicePixelRatio || 1;
  const lineColor = theme === "dark" ? darkBorderColor : lightBorderColor;

  const initCanvas = () => {
    canvas.width = canvasWidth * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${height}px`;

    // Scale the context to account for devicePixelRatio
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    return ctx;
  };

  const ctx = initCanvas();

  const $daysWithStat = computed($days, (days) =>
    days.filter((day) => day.stat)
  );

  const $maxDuration = computed($daysWithStat, (days) => {
    if (days.length === 0) {
      return HOUR_MS * 5.5;
    }

    let maxDuration = 0;

    for (let i = 0; i < days.length; i++) {
      const { totalSleepDuration, dayAwakeDuration } = days[i].stat;

      if (totalSleepDuration > maxDuration) {
        maxDuration = totalSleepDuration;
      }

      if (dayAwakeDuration > maxDuration) {
        maxDuration = dayAwakeDuration;
      }
    }

    return maxDuration;
  });

  const topOffset = HOUR_MS;
  const defaultVerticalScale = ($maxDuration.get() + topOffset) / height;

  const $verticalScale = atom(defaultVerticalScale);

  const verticalScaleAnimationController = initAnimationController(
    defaultVerticalScale,
    (newScale) => $verticalScale.set(newScale)
  );

  $maxDuration.listen((maxDuration) =>
    verticalScaleAnimationController.move(
      (maxDuration + topOffset) / height,
      5000
    )
  );

  const renderSidebar = () => {
    const verticalScale = $verticalScale.get();

    sidebarNode.innerHTML = "";

    const topDuration = verticalScale * height;

    let duration = HOUR_MS;

    while (duration < topDuration) {
      const node = document.createElement("div");
      node.classList.add(styles.durationTime);
      node.appendChild(document.createTextNode(text.timeDuration(duration)));

      const bottom = duration / verticalScale - 10;
      node.style.bottom = `${bottom}px`;
      sidebarNode.appendChild(node);

      duration += HOUR_MS;
    }
  };

  const renderGrid = () => {
    const verticalScale = $verticalScale.get();

    const topDuration = verticalScale * height;

    let duration = HOUR_MS;

    ctx.lineWidth = 1;
    ctx.strokeStyle = lineColor;

    while (duration < topDuration) {
      const top = height - duration / verticalScale;
      ctx.beginPath();
      ctx.moveTo(0, top + 0.5);
      ctx.lineTo(canvasWidth, top + 0.5);
      ctx.stroke();

      duration += HOUR_MS;
    }
  };

  const renderStat = () => {
    const days = $daysWithStat.get();

    if (days.length === 0) {
      return;
    }

    const value = $value.get();
    const verticalScale = $verticalScale.get();

    const daysLeft = days.map((day) => {
      const right = value - (day.dayDiff - 0.5) * dayWidth;
      const left = canvasWidth - right;

      return left;
    });

    const renderLine = (durations: number[], color: string) => {
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = color;

      ctx.beginPath();

      for (let i = 0; i < days.length; i++) {
        // const prevLeft = daysLeft[i - 1];
        const left = daysLeft[i];

        // const prevDuration = durations[i - 1];
        const duration = durations[i];

        // const prevTop = height - prevDuration / verticalScale;
        const top = height - duration / verticalScale;

        if (i === 0) {
          ctx.moveTo(left, top);
        } else {
          ctx.lineTo(left, top);
        }
      }

      ctx.stroke();
    };

    const totalSleepDuration = days.map((day) => day.stat.totalSleepDuration);
    const nightSleepDuration = days.map((day) => day.stat.nightSleepDuration);
    const daySleepDuration = days.map((day) => day.stat.daySleepDuration);
    const dayAwakeDuration = days.map((day) => day.stat.dayAwakeDuration);

    renderLine(totalSleepDuration, colors.totalSleep);
    renderLine(nightSleepDuration, colors.nightSleep);
    renderLine(daySleepDuration, colors.daySleep);
    renderLine(dayAwakeDuration, colors.dayAwake);
  };

  const renderCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderGrid();
    renderStat();
  };

  let renderPlanned = false;
  const requestRender = () => {
    if (renderPlanned) {
      return;
    }

    renderPlanned = true;

    requestAnimationFrame(() => {
      renderSidebar();
      renderCanvas();
      renderPlanned = false;
    });
  };

  const unsubscribeVerticalScale = $verticalScale.subscribe(requestRender);
  const unsubscribeValue = $value.subscribe(requestRender);
  const unsubscribeDays = $daysWithStat.subscribe(requestRender);

  const destroy = () => {
    unsubscribeVerticalScale();
    unsubscribeValue();
    unsubscribeDays();
    verticalScaleAnimationController.destroy();
  };

  return {
    destroy,
  };
}

export function StatChart({ className, contentSize }: StatChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const napEvents = useSelector(selectNapEvents);
  const currentDay = useSelector(selectCurrentDay);
  const theme = useSelector(selectTheme);
  const text = useText();
  const { statisticsPage } = text;

  const footerHeight = useMemo(
    () => (contentSize.width <= 560 ? 80 : 50),
    [contentSize.width]
  );

  const lang = useSelector(selectLanguage);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "horizontal",
        maxValue: 0,
      }),
    []
  );

  const chartState = useMemo(
    () => initChartState(contentSize, scrollController, napEvents, currentDay),
    [contentSize, scrollController, napEvents]
  );

  const { dayWidth, $days } = chartState;

  const days = useStore($days);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const sidebarNode = sidebarRef.current;

    if (!canvasNode || !sidebarNode) {
      return;
    }

    const chartRenderer = initChartRenderer(
      chartState,
      scrollController,
      contentSize,
      canvasNode,
      sidebarNode,
      lang,
      theme,
      footerHeight,
      text
    );

    return () => chartRenderer.destroy();
  }, [chartState, scrollController, lang, theme, footerHeight, text]);

  return (
    <InfiniteScroll
      scrollController={scrollController}
      className={cn(className, styles.root)}
    >
      <div className={styles.header}>
        {days.map(({ date, right }) => {
          const width = dayWidth;

          return (
            <div
              className={styles.dayHeader}
              style={{ right, width }}
              key={date.getTime()}
            >
              {formatDate(date, { lang })}
            </div>
          );
        })}
      </div>
      <div className={styles.chartContent}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <div className={styles.sidebar} ref={sidebarRef} />
      <div className={styles.footer}>
        <div
          className={styles.colorCaption}
          style={{ color: colors.totalSleep }}
        >
          {statisticsPage.totalSleep}
        </div>
        <div
          className={styles.colorCaption}
          style={{ color: colors.nightSleep }}
        >
          {statisticsPage.nightSleep}
        </div>
        <div className={styles.colorCaption} style={{ color: colors.daySleep }}>
          {statisticsPage.daySleep}
        </div>
        <div className={styles.colorCaption} style={{ color: colors.dayAwake }}>
          {statisticsPage.awake}
        </div>
      </div>
    </InfiniteScroll>
  );
}
