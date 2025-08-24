import React from "react";
import styles from "./time-picker.module.css";
import { DatePickerRaw } from "./date-picker-raw";
import { cn } from "utils/cn";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
};

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  return (
    <div className={cn(className, styles.timePicker)}>
      <div className={styles.border} />
      <DatePickerRaw value={value} onChange={onChange} snapSize={44} />
    </div>
  );
}
