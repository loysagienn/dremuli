import React from "react";
import { useSelector } from "react-redux";
import { selectActiveDay, selectActiveDayStat } from "selectors/active-day";
import { formatDate, formatDuration } from "utils/date";
import styles from "./active-day.module.css";
import { cn } from "utils/cn";

type ActiveDayProps = {
  className?: string;
};

export function ActiveDay({ className }: ActiveDayProps) {
  const activeDay = useSelector(selectActiveDay);
  const activeDayStat = useSelector(selectActiveDayStat);

  if (!activeDay || !activeDayStat) {
    return null;
  }

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.dateTitle}>{formatDate(activeDay)}</div>

      <div className={styles.content}>
        {activeDayStat.totalSleepDuration > 0 && (
          <div className={styles.dataRow}>{`Total sleep: ${formatDuration(
            activeDayStat.totalSleepDuration
          )}`}</div>
        )}

        {activeDayStat.nightSleepDuration > 0 && (
          <div className={styles.dataRow}>{`Night sleep: ${formatDuration(
            activeDayStat.nightSleepDuration
          )}`}</div>
        )}

        {activeDayStat.nightAwakeDuration > 0 && (
          <div className={styles.dataRow}>{`Night awake: ${formatDuration(
            activeDayStat.nightAwakeDuration
          )}`}</div>
        )}

        {activeDayStat.dayNapsCount > 0 && (
          <div className={styles.dataRow}>{`${
            activeDayStat.dayNapsCount
          } naps: ${formatDuration(activeDayStat.daySleepDuration)}`}</div>
        )}

        {activeDayStat.dayAwakeDuration > 0 && (
          <div className={styles.dataRow}>{`Awake: ${formatDuration(
            activeDayStat.dayAwakeDuration
          )}`}</div>
        )}
      </div>
    </div>
  );
}
