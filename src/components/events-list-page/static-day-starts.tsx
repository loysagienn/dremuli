import React, { memo, ReactNode } from "react";
import { EventsListState } from "./events-list-state";
import { useQuant } from "utils/quant";
import { NapEventContent } from "./nap-event-content";
import styles from "./events-list-page.module.css";
import { DAY_START_PADDING, DAY_START_HEIGHT } from "./constants";

type StickyDayStartsProps = {
  eventsListState: EventsListState;
};

function StickyDayStarts({ eventsListState }: StickyDayStartsProps) {
  // console.log("render StickyDayStarts");
  const { $stickyDayStartIndexes, napEvents } = eventsListState;
  const stickyDayStartIndexes = useQuant($stickyDayStartIndexes);

  const content: ReactNode[] = [];

  for (let i = 0; i < stickyDayStartIndexes.length; i++) {
    const index = stickyDayStartIndexes[i];
    const napEvent = napEvents[index];

    content.push(
      <div className={styles.dayStart} style={{ top: 0 }} key={index}>
        {napEvent.dayStartStr}
      </div>
    );
  }

  return <>{content}</>;
}

const EnhancedStickyDayStarts = memo(StickyDayStarts);

export { EnhancedStickyDayStarts as StickyDayStarts };
