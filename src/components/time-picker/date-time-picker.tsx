import React, { useCallback } from "react";
import styles from "./time-picker.module.css";
import { cn } from "utils/cn";
import { HoursPicker } from "./hours-picker";
import { MinutesPicker } from "./minutes-picker";
import { DatePicker } from "./date-picker";

type DateTimePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
};

const SNAP_SIZE = 44;
const CONTAINER_HEIGHT = 200;

export function DateTimePicker({
  value,
  onChange,
  className,
}: DateTimePickerProps) {
  const changeHanler = useCallback(
    (value: Date) => {
      onChange(value);

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(20);
      }
    },
    [onChange]
  );
  return (
    <div className={cn(className, styles.timePicker)}>
      <DatePicker
        value={value}
        onChange={changeHanler}
        containerHeight={CONTAINER_HEIGHT}
        snapSize={SNAP_SIZE}
      />
      <HoursPicker
        value={value}
        onChange={changeHanler}
        containerHeight={CONTAINER_HEIGHT}
        snapSize={SNAP_SIZE}
      />
      <div className={styles.clock}>
        <div className={styles.dotTop} />
        <div className={styles.dotBottom} />
      </div>
      <MinutesPicker
        value={value}
        onChange={changeHanler}
        containerHeight={CONTAINER_HEIGHT}
        snapSize={SNAP_SIZE}
      />
    </div>
  );
}
