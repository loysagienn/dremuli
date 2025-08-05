import React, { useCallback, useMemo, useEffect, useState } from "react";
import styles from "./time-picker.module.css";
import {
  initInfiniteScrollController,
  InfiniteItems,
} from "components/scrolling";
import { formatDate, getDaysDiff } from "utils/date";
import { cn } from "utils/cn";
import { useSelector } from "react-redux";
import { selectLanguage } from "selectors";

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
  snapSize: number;
};

export function DatePicker({
  value,
  onChange,
  className,
  snapSize,
}: DatePickerProps) {
  const daysDiff = useMemo(() => getDaysDiff(value), [value]);
  const lang = useSelector(selectLanguage);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "vertical",
        defaultValue: -daysDiff * snapSize,
        snapSize,
        minValue: -snapSize * 364,
        maxValue: 0,
        scale: 1,
      }),
    []
  );

  useEffect(
    () => () => {
      scrollController.destroy();
    },
    [scrollController]
  );

  useEffect(() => {
    return scrollController.$value.listen((pixelValue) => {
      const newDaysDiff = -Math.round(pixelValue / snapSize);

      if (newDaysDiff !== daysDiff) {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() - newDaysDiff + daysDiff);

        onChange(newDate);
      }
    });
  }, [scrollController, onChange, daysDiff, value]);

  const getValueContent = useCallback(
    (pixelValue: number, onClick: () => void) => {
      const daysDiff = Math.round(pixelValue / snapSize);
      const date = new Date();
      date.setDate(date.getDate() + daysDiff);

      return (
        <div className={styles.dateValue}>
          <div className={styles.dateValueText} onClick={onClick}>
            {formatDate(date, { lang })}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <InfiniteItems
      className={cn(className, styles.picker, styles.datePicker)}
      scrollController={scrollController}
      getValueContent={getValueContent}
    />
  );
}
