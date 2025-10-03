import React, { memo, useContext, useEffect, useMemo, useRef } from "react";
import styles from "./events-timeline.module.css";
import { NapEvent } from "types";
import { dayStartContext } from "./day-start-context";

type DayStartProps = {
  napEvent: NapEvent;
};

function DayStart({ napEvent }: DayStartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerDayStartNode, unregisterDayStartNode } =
    useContext(dayStartContext);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      registerDayStartNode(node, napEvent);

      return () => {
        unregisterDayStartNode(node);
      };
    }
  }, [napEvent]);

  return (
    <>
      <div className={styles.dayStartSpacer} ref={ref} />
      <div className={styles.dayStart}>{napEvent.dayStartStr}</div>
    </>
  );
}

const EnhancedDayStart = memo(DayStart);

export { EnhancedDayStart as DayStart };
