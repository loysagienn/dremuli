import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./time-picker.module.css";
import {
  initInfiniteScrollController,
  InfiniteItems,
} from "components/scrolling";
import { cn } from "utils/cn";

type HoursPickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
  snapSize: number;
};

export function HoursPicker({
  value,
  onChange,
  className,
  snapSize,
}: HoursPickerProps) {
  const hour = value.getHours();

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "vertical",
        defaultValue: hour * snapSize,
        snapSize,
        scale: 1,
      }),
    []
  );

  useEffect(() => {
    return scrollController.$value.listen((pixelValue) => {
      let newHour = Math.round(pixelValue / snapSize) % 24;

      if (newHour < 0) {
        newHour += 24;
      }

      if (newHour !== hour) {
        const newDate = new Date(value);
        newDate.setHours(newHour);
        onChange(newDate);
      }
    });
  }, [scrollController, onChange, hour, value]);

  const getValueContent = useCallback(
    (pixelValue: number, onClick: () => void) => {
      let hour = Math.round(pixelValue / snapSize) % 24;
      if (hour < 0) {
        hour += 24;
      }
      const hourStr = String(hour).padStart(2, "0");

      return (
        <div className={styles.dateValue}>
          <div className={styles.dateValueText} onClick={onClick}>
            {hourStr}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <InfiniteItems
      className={cn(className, styles.picker, styles.hoursPicker)}
      scrollController={scrollController}
      getValueContent={getValueContent}
    />
  );
}
