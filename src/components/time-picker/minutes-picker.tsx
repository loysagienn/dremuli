import React, { useCallback, useMemo, useEffect, useState } from "react";
import styles from "./time-picker.module.css";
import {
  initInfiniteScrollController,
  InfiniteItems,
} from "components/scrolling";
import { cn } from "utils/cn";

type MinutesPickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
  containerHeight: number;
  snapSize: number;
};

export function MinutesPicker({
  value,
  onChange,
  className,
  containerHeight,
  snapSize,
}: MinutesPickerProps) {
  const minutes = value.getMinutes();

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "vertical",
        defaultValue: minutes * snapSize,
        snapSize,
        scale: 1,
      }),
    []
  );

  useEffect(() => {
    return scrollController.$value.listen((pixelValue) => {
      let newMinutes = Math.round(pixelValue / snapSize) % 60;

      if (newMinutes < 0) {
        newMinutes += 60;
      }

      if (newMinutes !== minutes) {
        const newDate = new Date(value);
        newDate.setMinutes(newMinutes);
        onChange(newDate);
      }
    });
  }, [scrollController, onChange, minutes, value]);

  const getValueContent = useCallback(
    (pixelValue: number, onClick: () => void) => {
      let minutes = Math.round(pixelValue / snapSize) % 60;
      if (minutes < 0) {
        minutes += 60;
      }
      const minutesStr = String(minutes).padStart(2, "0");

      return (
        <div className={styles.dateValue}>
          <div className={styles.dateValueText} onClick={onClick}>
            {minutesStr}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <InfiniteItems
      className={cn(className, styles.picker, styles.minutesPicker)}
      scrollController={scrollController}
      getValueContent={getValueContent}
    />
  );
}
