import React, { useCallback, WheelEvent, useRef } from "react";
import styles from "./time-picker.module.css";
import { InfiniteScroll } from "components/infinite-scroll";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onScrollChange = useCallback((value: number) => {
    // console.log("value", value);
    if (ref.current) {
      ref.current.innerHTML = String(value);
    }
  }, []);

  return (
    <InfiniteScroll
      onChange={onScrollChange}
      className={styles.datePicker}
      snapSize={40}
    >
      Date picker
      <div ref={ref} />
    </InfiniteScroll>
  );
}
