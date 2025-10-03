import React, { memo, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./events-timeline.module.css";
import { EventType } from "types";
import { useText } from "lang/context";
import { Button } from "components/button";
import { OptionsBtn } from "./options-btn";
import { useSelector } from "react-redux";
import { selectNextEventType } from "selectors";

function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  const text = useText();

  const eventTypeTitles = useMemo<{ [key in EventType]: string }>(
    () => ({
      [EventType.WokeUp]: text.timelinePage.wokeUp,
      [EventType.FellAsleep]: text.timelinePage.fellAsleep,
    }),
    [text]
  );
  const nextEventType = useSelector(selectNextEventType);

  return (
    <div className={styles.footer} ref={ref}>
      <Button route={{ key: "create_event" }} className={styles.createNapBtn}>
        {eventTypeTitles[nextEventType]}
      </Button>
      <OptionsBtn />
    </div>
  );
}

const EnhancedFooter = memo(Footer);

export { EnhancedFooter as Footer };
