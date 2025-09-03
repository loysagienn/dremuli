import React, { memo, ReactNode } from "react";
import { EventsListState } from "./events-list-state";
import { useQuant } from "utils/quant";
import { NapEventContent } from "./nap-event-content";
import styles from "./events-list-page.module.css";
import { DAY_START_PADDING, DAY_START_HEIGHT } from "./constants";

type DayStartsProps = {
  eventsListState: EventsListState;
};

function DayStarts({ eventsListState }: DayStartsProps) {
  const { $activeDayStartIndexes, napEvents, offsets, scrollController } =
    eventsListState;
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const activeDayStartIndexes = useQuant($activeDayStartIndexes);

  const content: ReactNode[] = [];

  for (let i = 0; i < activeDayStartIndexes.length; i++) {
    const index = activeDayStartIndexes[i];
    const napEvent = napEvents[index];
    let eventOffset = offsets[index] - DAY_START_PADDING - DAY_START_HEIGHT;
    const top = eventOffset - scrollStartValue;

    content.push(
      <div className={styles.dayStart} style={{ top }} key={index}>
        {napEvent.dayStartStr}
      </div>
    );
  }

  return <>{content}</>;
}

const EnhancedDayStarts = memo(DayStarts);

export { EnhancedDayStarts as DayStarts };
