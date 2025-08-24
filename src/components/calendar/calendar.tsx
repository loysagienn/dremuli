import React from "react";

type CalendarProps = {
  value?: Date;
  onPickDay?: (value: Date) => void;
  className?: string;
};

export function Calendar({ value, onPickDay, className }: CalendarProps) {
  return <div className={className}>Calendar</div>;
}
