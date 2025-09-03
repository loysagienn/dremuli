import React, { useEffect, useMemo, useRef } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import {
  ScrollContent,
  ScrollController,
  StickyContent,
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

type EventsListProps = {
  scrollController: ScrollController;
};

export function EventsList({ scrollController }: EventsListProps) {
  console.log("render EventsList");
  const contentRef = useRef<HTMLDivElement>(null);
  const napEvents = useSelector(selectNapEvents);

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
    <>
      <Events eventsListState={eventsListState} />
      <StickyContent scrollController={scrollController}>
        <StickyDayStarts eventsListState={eventsListState} />
      </StickyContent>
      <DayStarts eventsListState={eventsListState} />
      <SideLine eventsListState={eventsListState} />
      <Dots eventsListState={eventsListState} />
      <Footer scrollController={scrollController} />
    </>
  );
}
