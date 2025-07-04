import React, { useLayoutEffect, useRef } from "react";
import styles from "./naps.module.css";
import { cn } from "utils/cn";
import { Event } from "./event";
import { Button } from "components/button";
import { useSelector } from "react-redux";
import { selectNapEvents } from "selectors";

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
  }, [napEvents]);

  return (
    <div className={cn(className, styles.root)} ref={rootRef}>
      <div className={styles.content}>
        {napEvents.map((napEvent) => (
          <Event napEvent={napEvent} key={napEvent.id} />
        ))}

        <Button route={{ key: "create_nap" }}>Create nap</Button>
      </div>
    </div>
  );
}
