import React, { useCallback, WheelEvent, useRef } from "react";
import styles from "./time-picker.module.css";
import { InfiniteScroll, InfiniteItems } from "components/infinite-scroll";

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

  const getItem = useCallback((value: number) => <div>{value}</div>, []);

  return (
    <InfiniteItems
      onChange={onScrollChange}
      getValue={getItem}
      className={styles.datePicker}
      snapSize={40}
    />
  );
}
