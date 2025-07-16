import React, { useMemo } from "react";
import { NapEvent, NapEventType } from "types";
import styles from "./naps.module.css";
import { Link } from "components/router";
import { AppRoute } from "app/router";

type EventProps = {
  napEvent: NapEvent;
};

const titles: { [key in NapEventType]: string } = {
  [NapEventType.Awake]: "Woke up",
  [NapEventType.Sleep]: "Fell asleep",
};

export function Event({ napEvent }: EventProps) {
  const napRoute = useMemo<AppRoute>(
    () => ({ key: "update_event", eventId: napEvent.event.id }),
    [napEvent]
  );

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
      <div className={styles.napEvent} id={napEvent.id}>
        <div className={styles.napEventTime}>{napEvent.timeStr}</div>
        <Link className={styles.napEventTitle} route={napRoute}>
          {napEvent.isNightSleep
            ? `${titles[napEvent.type]} night`
            : titles[napEvent.type]}
        </Link>
        <div className={styles.napEventDuration}>{napEvent.durationStr}</div>
        <div className={styles.napEventLine} />
        <div className={styles.napEventPointer} />
      </div>
    </>
  );
}
