import React, { memo, useMemo } from "react";
import styles from "./events-list-page.module.css";
import { EventType, NapEvent } from "types";
import { useText } from "lang/context";
import { AppRoute } from "app/router";
import { Link } from "components/router";

type NapEventContentProps = {
  napEvent: NapEvent;
};

function NapEventContent({ napEvent }: NapEventContentProps) {
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
      <Link className={styles.napEventTime} route={napRoute}>
        {napEvent.timeStr}
      </Link>

      <Link className={styles.napEventTitle} route={napRoute}>
        {napEvent.isNightSleep ? text.fellAsleepNight : titles[napEvent.type]}
      </Link>

      <div className={styles.napEventDuration}>
        {timeDuration(napEvent.duration)}
      </div>

      {/* <div className={styles.napEventDot} /> */}
    </>
  );
}

const EnhancedNapEventContent = memo(NapEventContent);

export { EnhancedNapEventContent as NapEventContent };
