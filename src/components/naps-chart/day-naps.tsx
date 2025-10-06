import React, { memo, useMemo } from "react";
import styles from "./naps-chart.module.css";
import { formatDate } from "utils/date";
import {
  selectActiveTimezone,
  selectLanguage,
  selectNapEvents,
  selectSleepEvents,
} from "selectors";
import { useSelector } from "react-redux";
import { cn } from "utils/cn";
import { getDayStartSameDate } from "utils/date";
import { MouseController } from "./mouse-controller";
import { NapEvent } from "types";
import { useQuant } from "utils/quant";
import { ActiveNap } from "./active-nap";

type DayNapsProps = {
  date: Date;
  height: number;
  width: number;
  headerHeight: number;
  dayWidth: number;
  mouseController: MouseController;
};

const dayMs = 1000 * 60 * 60 * 24;

function DayNaps({
  date,
  height,
  width,
  headerHeight,
  dayWidth,
  mouseController,
}: DayNapsProps) {
  const napEvents = useSelector(selectNapEvents);
  const timeZone = useSelector(selectActiveTimezone);
  const activeNapEvent = useQuant(mouseController.$activeNapEvent);

  const [dayStartTs, dayEndTs] = useMemo(() => {
    if (!date) return [0, 0];

    const dayStart = getDayStartSameDate(date, timeZone);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return [dayStart.getTime(), dayEnd.getTime()];
  }, [date]);

  // const dayStartTs = date.getTime();
  const dayHeight = height - headerHeight;
  const pixelsInMs = dayHeight / dayMs;

  const dayEvents = useMemo(() => {
    // const nextDate = new Date(date);
    // nextDate.setDate(nextDate.getDate() + 1);
    // const endTimestamp = nextDate.getTime();

    return napEvents.filter((event) => {
      const eventStart = event.timestamp.getTime();
      const eventEnd = event.endTime.getTime();

      return eventEnd > dayStartTs && eventStart < dayEndTs;
    });
  }, [dayStartTs, dayEndTs, napEvents]);

  const napWidth = Math.min(dayWidth / 2, 32);
  const left = (dayWidth - napWidth) / 2;
  const right = left;

  const onMouseOver = (napEvent: NapEvent) => () => {
    mouseController.setActiveNap(napEvent);
  };
  const onMouseLeave = (napEvent: NapEvent) => () => {
    if (mouseController.$activeNapEvent.get() === napEvent) {
      mouseController.setActiveNap(null);
    }
  };

  return (
    <>
      {dayEvents.map((event) => {
        const eventStart = event.timestamp.getTime();
        const eventEnd = event.endTime.getTime();

        const topMs = eventStart - dayStartTs;
        const bottomMs = dayStartTs + dayMs - eventEnd;
        let top = headerHeight + topMs * pixelsInMs + 1;
        let bottom = bottomMs * pixelsInMs + 1;

        const classNames = [styles.dayNap];

        if (top < headerHeight) {
          top = headerHeight;
          classNames.push(styles.dayStart);
        }

        if (bottom < 0) {
          bottom = 0;
          classNames.push(styles.dayEnd);
        }

        if (event === activeNapEvent) {
          classNames.push(styles.isActive);
        }

        classNames.push(styles[event.type]);

        return (
          <div
            className={cn(...classNames)}
            key={event.id}
            style={{ left, right, top, bottom }}
            onMouseOver={onMouseOver(event)}
            onMouseLeave={onMouseLeave(event)}
          >
            {activeNapEvent === event && (
              <ActiveNap
                napEvent={event}
                mouseController={mouseController}
                headerHeight={headerHeight}
                height={height}
                width={width}
                left={left}
                right={right}
                top={top}
                bottom={bottom}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

const EnhancedDayNaps = memo(DayNaps);

export { EnhancedDayNaps as DayNaps };
