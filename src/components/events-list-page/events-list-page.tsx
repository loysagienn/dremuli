import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import {
  ScrollContent,
  createScrollController,
} from "components/scroll-content";
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
      createScrollController({
        direction: "vertical",
        defaultScale: 1,
        defaultValue: 0,
        valuePosition: 1,
        scalingEnabled: false,
      }),
    []
  );

  useEffect(
    () => () => {
      scrollController.destroy();
    },
    [scrollController]
  );

  // useEffect(() => {
  //   if (eventsListRef.current) {
  //     const { destroy, $size } = trackDivSize(eventsListRef.current);

  //     const unsubscribe = $size.subscribe((size) => {
  //       setEventsListHeight(size.height);
  //     });

  //     return () => {
  //       unsubscribe();
  //       destroy();
  //     };
  //   }
  // }, []);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.activeDayContainer}>
          <ActiveDay className={styles.activeDay} />
        </div>
        <ScrollContent
          className={styles.eventsListContainer}
          scrollController={scrollController}
        >
          {/* <div className={styles.eventsList} ref={eventsListRef}> */}
          <Footer scrollController={scrollController} />
          <EventsList
            scrollController={scrollController}
            containerHeight={eventsListHeight}
          />
          {/* {eventsListHeight > 0 && (
              <EventsList
                scrollController={scrollController}
                containerHeight={eventsListHeight}
              />
            )} */}
          {/* </div> */}
        </ScrollContent>
      </div>
    </Layout>
  );
}
