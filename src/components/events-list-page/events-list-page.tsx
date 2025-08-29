import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import {
  InfiniteScroll,
  initInfiniteScrollController,
} from "components/scrolling";
import { useQuant } from "utils/quant";
import { Footer } from "./footer";
import { EventsList } from "./events-list";
import { trackDivSize } from "utils/div-size";

export function EventsListPage() {
  console.log("render events list page");
  const eventsListRef = useRef<HTMLDivElement>(null);
  const [eventsListHeight, setEventsListHeight] = useState(0);

  const scrollController = useMemo(
    () =>
      initInfiniteScrollController({
        direction: "vertical",
        scale: 1,
        maxValue: 0,
        defaultValue: 0,
        scalingEnabled: true,
      }),
    []
  );

  useEffect(
    () => () => {
      scrollController.destroy();
    },
    [scrollController]
  );

  useEffect(() => {
    if (eventsListRef.current) {
      const { destroy, $size } = trackDivSize(eventsListRef.current);

      const unsubscribe = $size.subscribe((size) => {
        setEventsListHeight(size.height);
      });

      return () => {
        unsubscribe();
        destroy();
      };
    }
  }, []);

  return (
    <Layout>
      <InfiniteScroll
        scrollController={scrollController}
        className={styles.content}
      >
        <div className={styles.eventsListContainer}>
          <div className={styles.eventsList} ref={eventsListRef}>
            <Footer scrollController={scrollController} />
            {eventsListHeight > 0 && (
              <EventsList
                scrollController={scrollController}
                containerHeight={eventsListHeight}
              />
            )}
          </div>
        </div>
        <div className={styles.activeDayContainer}>
          <ActiveDay className={styles.activeDay} />
        </div>
      </InfiniteScroll>
    </Layout>
  );
}
