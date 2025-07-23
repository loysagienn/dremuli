import React, { useCallback, useMemo, useEffect, useState } from "react";
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
  return (
    <div className={cn(className, styles.timePicker)}>
      <DatePicker value={value} onChange={onChange} />
      <HoursPicker value={value} onChange={onChange} />
      <div className={styles.clock}>
        <div className={styles.dotTop} />
        <div className={styles.dotBottom} />
      </div>
      <MinutesPicker value={value} onChange={onChange} />
    </div>
  );
}
