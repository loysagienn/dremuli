import React, { memo, ReactNode } from "react";
import { EventsListState } from "./events-list-state";
import { useQuant } from "utils/quant";
import { NapEventContent } from "./nap-event-content";
import styles from "./events-list-page.module.css";

type DotsProps = {
  eventsListState: EventsListState;
};

function Dots({ eventsListState }: DotsProps) {
  const { $renderRange, napEvents, offsets, scrollController } =
    eventsListState;
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const [renderStartIndex, renderEndIndex] = useQuant($renderRange);

  const content: ReactNode[] = [];

  for (let i = renderStartIndex; i <= renderEndIndex; i++) {
    const napEvent = napEvents[i];
    const offset = offsets[i];
    const top = offset - scrollStartValue + 7;

    content.push(
      <div className={styles.napEventDot} style={{ top }} key={napEvent.id} />
    );
  }

  return <>{content}</>;
}

const EnhancedDots = memo(Dots);

export { EnhancedDots as Dots };
