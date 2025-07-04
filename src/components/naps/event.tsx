import React from "react";
import { NapEvent, NapEventType } from "types";
import styles from "./naps.module.css";
import { useSelector } from "react-redux";
import { selectTimeZone } from "selectors";

type EventProps = {
  napEvent: NapEvent;
};

const titles: { [key in NapEventType]: string } = {
  [NapEventType.Awake]: "Woke up",
  [NapEventType.Sleep]: "Fell asleep",
};

export function Event({ napEvent }: EventProps) {
  return (
    <>
      {napEvent.dayStartStr && (
        <div className={styles.napEventDayStart}>
          <div className={styles.napEventLine} />
          <div className={styles.napEventDayStartText}>
            {napEvent.dayStartStr}
          </div>
        </div>
      )}
      <div className={styles.napEvent}>
        <div className={styles.napEventTime}>{napEvent.timeStr}</div>
        <div className={styles.napEventTitle}>{titles[napEvent.type]}</div>
        <div className={styles.napEventDuration}>{napEvent.durationStr}</div>
        <div className={styles.napEventLine} />
        <div className={styles.napEventPointer} />
      </div>
    </>
  );
}
