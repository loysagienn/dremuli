import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate, getDaysDiff } from "utils/date";
import { cn } from "utils/cn";
import { HoursPicker } from "./hours-picker";
import { MinutesPicker } from "./minutes-picker";

type TimePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
};

const SNAP_SIZE = 44;
const CONTAINER_HEIGHT = 200;

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  return (
    <div className={cn(className, styles.timePicker)}>
      <HoursPicker
        value={value}
        onChange={onChange}
        containerHeight={CONTAINER_HEIGHT}
        snapSize={SNAP_SIZE}
      />
      <div className={styles.clock}>
        <div className={styles.dotTop} />
        <div className={styles.dotBottom} />
      </div>
      <MinutesPicker
        value={value}
        onChange={onChange}
        containerHeight={CONTAINER_HEIGHT}
        snapSize={SNAP_SIZE}
      />
    </div>
  );
}
