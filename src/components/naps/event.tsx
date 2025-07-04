import React from "react";
import { NapEvent, NapEventType } from "types";
import { formatDateTime } from "utils/date";
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
    <div className={styles.napEvent}>
      <div className={styles.napEventTime}>{napEvent.timeStr}</div>
      <div className={styles.napEventTitle}>{titles[napEvent.type]}</div>
      <div className={styles.napEventDuration}>{napEvent.durationStr}</div>
      <div className={styles.napEventLine} />
      <div className={styles.napEventPointer} />
    </div>
  );
}
