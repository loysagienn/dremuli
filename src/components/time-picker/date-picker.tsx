import React, { useCallback, WheelEvent, useRef } from "react";
import styles from "./time-picker.module.css";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    console.log("deltaY", event.deltaY);
    if (ref.current) {
      ref.current.innerHTML = String(event.deltaY);
    }
  }, []);

  return (
    <div className={styles.datePicker} onWheel={onWheel}>
      DatePicker
      <div ref={ref} />
    </div>
  );
}
