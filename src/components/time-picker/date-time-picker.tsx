import React, { useCallback, useCallback, useEffect, useState } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate, getDaysDiff } from "utils/date";
import { cn } from "utils/cn";
import { HoursPicker } from "./hours-picker";
import { MinutesPicker } from "./minutes-picker";
import { DatePicker } from "./date-picker";

type DateTimePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
};

const snapSize = 40;

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
      <DatePicker value={value} onChange={changeHanler} />
      <HoursPicker value={value} onChange={changeHanler} />
      <div className={styles.clock}>
        <div className={styles.dotTop} />
        <div className={styles.dotBottom} />
      </div>
      <MinutesPicker value={value} onChange={changeHanler} />
    </div>
  );
}
