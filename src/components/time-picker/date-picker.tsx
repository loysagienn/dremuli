import React, { useCallback, WheelEvent, useRef } from "react";
import styles from "./time-picker.module.css";
import { InfiniteItems } from "components/infinite-scroll";
import { formatDate } from "utils/date";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onScrollChange = useCallback((value: number) => {
    if (ref.current) {
      ref.current.innerHTML = String(value);
    }
  }, []);

  const getItem = useCallback((value: number, onClick: () => void) => {
    const daysDiff = Math.round(value / 40);
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
      onChange={onScrollChange}
      getValue={getItem}
      className={styles.datePicker}
      snapSize={40}
      containerHeight={160}
    />
  );
}
