import React, { memo, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./events-list-page.module.css";
import { EventType } from "types";
import { useText } from "lang/context";
import { Button } from "components/button";
import { OptionsBtn } from "./options-btn";
import { useSelector } from "react-redux";
import { selectNextEventType } from "selectors";
import { PADDING, FOOTER_HEIGHT } from "./constants";
import { ScrollController } from "components/scroll-content";

type FooterProps = {
  scrollController: ScrollController;
};

function handleFooterPosition(
  scrollController: ScrollController,
  node: HTMLDivElement
) {
  const unsubscribe = scrollController.$scrollStartValue.subscribe(
    (scrollStartValue) => {
      if (scrollStartValue < -20000) {
        node.style.display = "none";

        return;
      }

      node.style.display = "flex";
      node.style.top = `${-scrollStartValue - FOOTER_HEIGHT - PADDING}px`;
    }
  );

  return () => {
    unsubscribe();
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
