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
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>Total sleep</div>
          <div className={styles.dataValue}>
            {formatDuration(activeDayStat.totalSleepDuration)}
          </div>
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>Night sleep</div>
          <div className={styles.dataValue}>
            {formatDuration(activeDayStat.nightSleepDuration)}
          </div>
        </div>
        <div className={cn(styles.dataBlock, styles.nightSplitBlock)}>
          {activeDayStat.nightAwakeDuration > 0 && (
            <>
              <div className={styles.dataTitle}>Night split</div>
              <div className={styles.dataValue}>
                {formatDuration(activeDayStat.nightAwakeDuration)}
              </div>
            </>
          )}
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>{`${
            activeDayStat.dayNapsCount
          } nap${activeDayStat.dayNapsCount > 1 ? "s" : ""}`}</div>
          <div className={styles.dataValue}>
            {formatDuration(activeDayStat.daySleepDuration)}
          </div>
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>Awake</div>
          <div className={styles.dataValue}>
            {formatDuration(activeDayStat.dayAwakeDuration)}
          </div>
        </div>
      </div>
    </div>
  );
}
