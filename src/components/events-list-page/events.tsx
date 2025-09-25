import React, { memo, ReactNode } from "react";
import { EventsListState } from "./events-list-state";
import { useQuant } from "utils/quant";
import { NapEventContent } from "./nap-event-content";
import styles from "./events-list-page.module.css";

type EventsProps = {
  eventsListState: EventsListState;
};

function Events({ eventsListState }: EventsProps) {
  const { $renderRange, napEvents, offsets, scrollController } =
    eventsListState;
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);
  const scrollableLength = useQuant(scrollController.$scrollableLength);

  const [renderStartIndex, renderEndIndex] = useQuant($renderRange);

  const eventsContent: ReactNode[] = [];

  if (renderStartIndex === 0 && renderEndIndex === 0) {
    return <></>;
  }

  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const napEvent = napEvents[i];
    const offset = offsets[i];
    const top = offset - scrollStartValue;

    eventsContent.push(
      <div className={styles.napEvent} style={{ top }} key={napEvent.id}>
        <NapEventContent napEvent={napEvent} />
      </div>
    );
  }

  return <>{eventsContent}</>;
}

const EnhancedEvents = memo(Events);

export { EnhancedEvents as Events };
