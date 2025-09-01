import React, { useEffect, useMemo } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import {
  ScrollContent,
  StickyContent,
  createScrollController,
} from "components/scroll-content";
import { Footer } from "./footer";
import { initEventsListState } from "./events-list-state";
import { useSelector } from "react-redux";
import { selectNapEvents } from "selectors";
import { Events } from "./events";
import { DayStarts } from "./day-starts";
import { SideLine } from "./side-line";
import { StickyDayStarts } from "./static-day-starts";
import { Dots } from "./dots";

export function EventsListPage() {
  // console.log("render EventsListPage");
  const napEvents = useSelector(selectNapEvents);

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

  const eventsListState = useMemo(
    () => initEventsListState(napEvents, scrollController),
    [napEvents, scrollController]
  );

  useEffect(
    () => () => {
      eventsListState.destroy();
    },
    [eventsListState]
  );

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
          <Events eventsListState={eventsListState} />
          <StickyContent scrollController={scrollController}>
            <StickyDayStarts eventsListState={eventsListState} />
          </StickyContent>
          <DayStarts eventsListState={eventsListState} />
          <SideLine eventsListState={eventsListState} />
          <Dots eventsListState={eventsListState} />
          <Footer scrollController={scrollController} />
        </ScrollContent>
      </div>
    </Layout>
  );
}
