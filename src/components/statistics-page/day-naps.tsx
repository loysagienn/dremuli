import React, { memo, useMemo } from "react";
import styles from "./statistics-page.module.css";
import { formatDate } from "utils/date";
import { selectLanguage, selectSleepEvents } from "selectors";
import { useSelector } from "react-redux";
import { cn } from "utils/cn";

type DayNapsProps = {
  date: Date;
  height: number;
  headerHeight: number;
  dayWidth: number;
};

const dayMs = 1000 * 60 * 60 * 24;

function DayNaps({ date, height, headerHeight, dayWidth }: DayNapsProps) {
  const sleepEvents = useSelector(selectSleepEvents);
  const lang = useSelector(selectLanguage);

  const dayStartTs = date.getTime();
  const dayHeight = height - headerHeight;
  const pixelsInMs = dayHeight / dayMs;

  const dayEvents = useMemo(() => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const endTimestamp = nextDate.getTime();

    return sleepEvents.filter((event) => {
      const eventStart = event.timestamp.getTime();
      const eventEnd = event.endTime.getTime();

      return eventEnd > dayStartTs && eventStart < endTimestamp;
    });
  }, [date, sleepEvents]);

  const napWidth = Math.min(dayWidth / 2, 32);
  const left = (dayWidth - napWidth) / 2;
  const right = left;

  return (
    <>
      <div className={styles.dayHeader}>{formatDate(date, { lang })}</div>
      {dayEvents.map((event) => {
        const eventStart = event.timestamp.getTime();
        const eventEnd = event.endTime.getTime();

        const topMs = eventStart - dayStartTs;
        const bottomMs = dayStartTs + dayMs - eventEnd;
        let top = headerHeight + topMs * pixelsInMs;
        let bottom = bottomMs * pixelsInMs;

        const classNames = [styles.dayNap];

        if (top < headerHeight) {
          top = headerHeight;
          classNames.push(styles.dayStart);
        }

        if (bottom < 0) {
          bottom = 0;
          classNames.push(styles.dayEnd);
        }

        return (
          <div
            className={cn(...classNames)}
            key={event.id}
            style={{ left, right, top, bottom }}
          ></div>
        );
      })}
    </>
  );
}

const EnhancedDayNaps = memo(DayNaps);

export { EnhancedDayNaps as DayNaps };
