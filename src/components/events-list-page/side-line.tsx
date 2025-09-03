import React, { memo } from "react";
import { EventsListState } from "./events-list-state";
import { useQuant } from "utils/quant";
import styles from "./events-list-page.module.css";
import { PADDING, FOOTER_HEIGHT } from "./constants";

type SideLineProps = {
  eventsListState: EventsListState;
};

function SideLine({ eventsListState }: SideLineProps) {
  const { scrollController } = eventsListState;
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const sideLineHeight = -PADDING - FOOTER_HEIGHT - scrollStartValue;

  return <div className={styles.sideLine} style={{ height: sideLineHeight }} />;
}

const EnhancedSideLine = memo(SideLine);

export { EnhancedSideLine as SideLine };
