import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate, getDaysDiff } from "utils/date";
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

  const [defaultValue] = useState(minutes * snapSize);

  const onScrollChange = useCallback(
    (pixelValue: number) => {
      let newMinutes = Math.round(pixelValue / snapSize) % 60;
      if (newMinutes < 0) {
        newMinutes += 60;
      }
      if (newMinutes !== minutes) {
        const newDate = new Date(value);
        newDate.setMinutes(newMinutes);
        onChange(newDate);
      }
    },
    [value, minutes, onChange]
  );

  const getItem = useCallback((pixelValue: number, onClick: () => void) => {
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
  }, []);

  return (
    <InfiniteItems
      defaultValue={defaultValue}
      onChange={onScrollChange}
      getValue={getItem}
      className={cn(className, styles.picker, styles.minutesPicker)}
      snapSize={snapSize}
      containerHeight={containerHeight}
    />
  );
}
