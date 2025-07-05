import React, { useLayoutEffect, useRef } from "react";
import styles from "./naps.module.css";
import { cn } from "utils/cn";
import { Event } from "./event";
import { Button } from "components/button";
import { useSelector } from "react-redux";
import { selectNapEvents } from "selectors";
import { NapEventType } from "types";

type NapsProps = {
  className?: string;
};

export function Naps({ className }: NapsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const napEvents = useSelector(selectNapEvents);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (root) {
      if (root.scrollHeight > root.offsetHeight) {
        root.scrollTop = root.scrollHeight - root.offsetHeight;
      }

      root.style.opacity = "1";
    }
  }, []);

  const lastEvent =
    napEvents.length > 0 ? napEvents[napEvents.length - 1] : null;
  const isSleeping = lastEvent && lastEvent.type === NapEventType.Sleep;

  return (
    <div className={cn(className, styles.root)} ref={rootRef}>
      <div className={styles.content}>
        {napEvents.map((napEvent) => (
          <Event napEvent={napEvent} key={napEvent.id} />
        ))}

        {isSleeping && (
          <Button
            route={{ key: "update_nap", napId: lastEvent.nap.id }}
            className={styles.createNapBtn}
          >
            Update nap
          </Button>
        )}
        {!isSleeping && (
          <Button route={{ key: "create_nap" }} className={styles.createNapBtn}>
            Create nap
          </Button>
        )}
      </div>
    </div>
  );
}
