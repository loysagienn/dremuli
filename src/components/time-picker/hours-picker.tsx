import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate, getDaysDiff } from "utils/date";
import { cn } from "utils/cn";

type HoursPickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
  containerHeight: number;
  snapSize: number;
};

export function HoursPicker({
  value,
  onChange,
  className,
  containerHeight,
  snapSize,
}: HoursPickerProps) {
  const hour = value.getHours();

  const [defaultValue] = useState(hour * snapSize);

  const onScrollChange = useCallback(
    (pixelValue: number) => {
      let newHour = Math.round(pixelValue / snapSize) % 24;
      if (newHour < 0) {
        newHour += 24;
      }
      if (newHour !== hour) {
        const newDate = new Date(value);
        newDate.setHours(newHour);
        onChange(newDate);
      }
    },
    [value, hour, onChange]
  );

  const getItem = useCallback((pixelValue: number, onClick: () => void) => {
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
  }, []);

  return (
    <InfiniteItems
      defaultValue={defaultValue}
      onChange={onScrollChange}
      getValue={getItem}
      className={cn(className, styles.picker, styles.hoursPicker)}
      snapSize={snapSize}
      containerHeight={containerHeight}
    />
  );
}
