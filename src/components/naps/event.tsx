import React, { useMemo } from "react";
import { NapEvent, EventType } from "types";
import styles from "./naps.module.css";
import { Link } from "components/router";
import { AppRoute } from "app/router";
import { useText } from "lang/context";

type EventProps = {
  napEvent: NapEvent;
};

const titles: { [key in EventType]: string } = {
  [EventType.WokeUp]: "Woke up",
  [EventType.FellAsleep]: "Fell asleep",
};

export function Event({ napEvent }: EventProps) {
  const { timelinePage: text, timeDuration } = useText();
  const napRoute = useMemo<AppRoute>(
    () => ({ key: "update_event", eventId: napEvent.event.id }),
    [napEvent]
  );

  const titles = useMemo<{ [key in EventType]: string }>(
    () => ({
      [EventType.WokeUp]: text.wokeUp,
      [EventType.FellAsleep]: text.fellAsleep,
    }),
    [text]
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
          {napEvent.isNightSleep ? text.fellAsleepNight : titles[napEvent.type]}
        </Link>
        <div className={styles.napEventDuration}>
          {timeDuration(napEvent.duration)}
        </div>
        <div className={styles.napEventLine} />
        <div className={styles.napEventPointer} />
      </div>
    </>
  );
}
