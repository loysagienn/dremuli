import React from "react";
import styles from "./statistics-page.module.css";
import { useSelector } from "react-redux";
import { selectContentSize } from "selectors";
import { Timeline } from "./timeline";

const hoursMarks = [];

for (let i = 0; i < 24; i++) {
  hoursMarks.push(i);
}

const headerHeight = 40;
const sidebarWidth = 60;

export function Statistics() {
  const contentSize = useSelector(selectContentSize);
  const hourSize = (contentSize.height - headerHeight) / 24;

  const skipRate = hourSize > 30 ? 1 : hourSize > 15 ? 2 : 3;

  return (
    <>
      <div className={styles.sidebar}>
        {/* <div className={styles.sidebarHeader}></div> */}
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
      <Timeline
        width={contentSize.width - sidebarWidth}
        height={contentSize.height}
        headerHeight={headerHeight}
      />
    </>
  );
}
