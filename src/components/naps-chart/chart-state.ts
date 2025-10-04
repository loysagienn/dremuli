import { InfiniteScrollController } from "components/scrolling";
import { computedQuant } from "utils/quant";

const HOUR_MS = 1000 * 60 * 60;
const DAY_WIDTH_THRESHOLD = 68;

export function initChartState(
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
    if (dayWidth > DAY_WIDTH_THRESHOLD) {
      return days;
    }

    const skipFactor = Math.ceil(DAY_WIDTH_THRESHOLD / dayWidth);

    const headerDays = days.filter((day) => day.dayDiff % skipFactor === 0);

    return headerDays;
  });

  const $headerDayWidth = computedQuant([$dayWidth], (dayWidth) => {
    if (dayWidth > DAY_WIDTH_THRESHOLD) {
      return dayWidth;
    }

    const skipFactor = Math.ceil(DAY_WIDTH_THRESHOLD / dayWidth);

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

export type ChartState = ReturnType<typeof initChartState>;
