import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate, getDaysDiff } from "utils/date";
import { cn } from "utils/cn";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
  containerHeight: number;
  snapSize: number;
};

export function DatePicker({
  value,
  onChange,
  className,
  containerHeight,
  snapSize,
}: DatePickerProps) {
  const daysDiff = useMemo(() => getDaysDiff(value), [value]);

  const [defaultValue] = useState(-daysDiff * snapSize);

  const onScrollChange = useCallback(
    (pixelValue: number) => {
      const newDaysDiff = -Math.round(pixelValue / snapSize);

      if (newDaysDiff !== daysDiff) {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() - newDaysDiff + daysDiff);
        onChange(newDate);
      }
    },
    [value, daysDiff, onChange]
  );

  const getItem = useCallback((pixelValue: number, onClick: () => void) => {
    const daysDiff = Math.round(pixelValue / snapSize);
    const date = new Date();
    date.setDate(date.getDate() + daysDiff);

    return (
      <div className={styles.dateValue}>
        <div className={styles.dateValueText} onClick={onClick}>
          {formatDate(date)}
        </div>
      </div>
    );
  }, []);

  return (
    <InfiniteItems
      defaultValue={defaultValue}
      onChange={onScrollChange}
      getValue={getItem}
      className={cn(className, styles.picker, styles.datePicker)}
      snapSize={snapSize}
      containerHeight={containerHeight}
      min={-snapSize * 364}
      max={0}
    />
  );
}
