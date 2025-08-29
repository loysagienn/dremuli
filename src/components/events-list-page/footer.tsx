import React, { memo, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./events-list-page.module.css";
import { InfiniteScrollController } from "components/scrolling";
import { EventType } from "types";
import { useText } from "lang/context";
import { Button } from "components/button";
import { OptionsBtn } from "./options-btn";
import { useSelector } from "react-redux";
import { selectNextEventType } from "selectors";
import { PADDING } from "./constants";

type FooterProps = {
  scrollController: InfiniteScrollController;
};

function handleFooterPosition(
  scrollController: InfiniteScrollController,
  node: HTMLDivElement
) {
  const unsubscribeValue = scrollController.$value.subscribe((value) => {
    node.style.bottom = `${PADDING + value}px`;
  });

  node.style.opacity = "1";

  return () => {
    unsubscribeValue();
  };
}

function Footer({ scrollController }: FooterProps) {
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

  useLayoutEffect(() => {
    if (ref.current) {
      return handleFooterPosition(scrollController, ref.current);
    }
  }, [scrollController]);

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
