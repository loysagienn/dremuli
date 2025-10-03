import React, { memo, useMemo } from "react";
import styles from "./events-timeline.module.css";
import { EventType, NapEvent } from "types";
import { useText } from "lang/context";
import { AppRoute } from "app/router";
import { Link } from "components/router";

type TimelineEventProps = {
  napEvent: NapEvent;
};

function TimelineEvent({ napEvent }: TimelineEventProps) {
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

  // console.log("napEvent", napEvent);
  return (
    <div className={styles.event}>
      <div className={styles.eventTime}>
        <Link className={styles.eventTimeText} route={napRoute}>
          {napEvent.timeStr}
        </Link>
      </div>
      <div className={styles.eventContent}>
        <Link className={styles.eventContentTitle} route={napRoute}>
          {napEvent.isNightSleep ? text.fellAsleepNight : titles[napEvent.type]}
        </Link>

        <div className={styles.eventContentDuration}>
          {timeDuration(napEvent.duration)}
        </div>
        <div className={styles.eventDot} />
      </div>
    </div>
  );
}

const EnhancedTimelineEvent = memo(TimelineEvent);

export { EnhancedTimelineEvent as TimelineEvent };
