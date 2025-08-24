import React, { useMemo } from "react";
import { Calendar } from "components/calendar";
import { formatDate } from "utils/date";
import { useSelector } from "react-redux";
import { selectLanguage } from "selectors";
import styles from "./date-picker.module.css";

type DatePickerProps = {
  value?: Date | null;
  onChange: (value: Date) => void;
  className?: string;
};

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const lang = useSelector(selectLanguage);

  const textValue = useMemo(() => {
    if (value) {
      return formatDate(value, { lang });
    }

    return "";
  }, [value, lang]);

  return (
    <div className={className}>
      <div className={styles.textValue}>{textValue}</div>
      <Calendar
        value={value}
        onPickDay={onChange}
        className={styles.calendar}
      />
    </div>
  );
}
