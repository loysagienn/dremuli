import React from "react";
import styles from "./naps-chart.module.css";
import { Size } from "types";

const hoursMarks = [];

for (let i = 0; i < 24; i++) {
  hoursMarks.push(i);
}

type StatisticsProps = {
  contentSize: Size;
  headerHeight: number;
};

export function Sidebar({ contentSize, headerHeight }: StatisticsProps) {
  const hourSize = (contentSize.height - headerHeight) / 24;

  const skipRate = hourSize > 30 ? 1 : hourSize > 15 ? 2 : 3;

  return (
    <>
      <div className={styles.sidebar}>
        {hoursMarks.map((hour) => {
          if (hour % skipRate !== 0) {
            return null;
          }

          const top = headerHeight + hour * hourSize - hourSize / 2;
          const height = hourSize;

          const style = { top, height };
          const hourStr = String(hour).padStart(2, "0");

          return (
            <div
              className={styles.hourMark}
              style={style}
              key={hour}
            >{`${hourStr}:00`}</div>
          );
        })}
      </div>
      {hoursMarks.map((hour) => {
        if (hour % skipRate !== 0) {
          return null;
        }

        const top = headerHeight + hour * hourSize;

        return <div key={hour} className={styles.hourLine} style={{ top }} />;
      })}
    </>
  );
}
