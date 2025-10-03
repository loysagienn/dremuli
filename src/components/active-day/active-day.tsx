import React from "react";
import { useSelector } from "react-redux";
import { selectActiveDay, selectActiveDayStat } from "selectors/active-day";
import { formatDate } from "utils/date";
import styles from "./active-day.module.css";
import { cn } from "utils/cn";
import { useText } from "lang/context";
import { selectActiveTimezone, selectLanguage } from "selectors";

type ActiveDayProps = {
  className?: string;
};

export function ActiveDay({ className }: ActiveDayProps) {
  const { daySummary: text, timeDuration } = useText();
  const lang = useSelector(selectLanguage);
  const activeDay = useSelector(selectActiveDay);
  const timeZone = useSelector(selectActiveTimezone);
  const activeDayStat = useSelector(selectActiveDayStat);

  if (!activeDay || !activeDayStat) {
    return null;
  }

  return (
    <div className={cn(className, styles.root)}>
      <div className={styles.dateTitle}>
        {formatDate(activeDay, { lang, timeZone, month: "long" })}
      </div>

      <div className={styles.content}>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>{text.totalSleep}</div>
          <div className={styles.dataValue}>
            {timeDuration(activeDayStat.totalSleepDuration)}
          </div>
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>{text.nightSleep}</div>
          <div className={styles.dataValue}>
            {timeDuration(activeDayStat.nightSleepDuration)}
          </div>
        </div>
        <div className={cn(styles.dataBlock, styles.nightSplitBlock)}>
          {activeDayStat.nightAwakeDuration > 0 && (
            <>
              <div className={styles.dataTitle}>{text.nightSplit}</div>
              <div className={styles.dataValue}>
                {timeDuration(activeDayStat.nightAwakeDuration)}
              </div>
            </>
          )}
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>
            {text.napsCount(activeDayStat.dayNapsCount)}
          </div>
          <div className={styles.dataValue}>
            {timeDuration(activeDayStat.daySleepDuration)}
          </div>
        </div>
        <div className={styles.dataBlock}>
          <div className={styles.dataTitle}>{text.awake}</div>
          <div className={styles.dataValue}>
            {timeDuration(activeDayStat.dayAwakeDuration)}
          </div>
        </div>
      </div>
    </div>
  );
}
