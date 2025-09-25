import React, { useEffect, useMemo } from "react";
import { ScrollController, StickyContent } from "components/scroll-content";
import { Footer } from "./footer";
import { initEventsListState } from "./events-list-state";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSharePage, selectNapEvents } from "selectors";
import { Events } from "./events";
import { DayStarts } from "./day-starts";
import { SideLine } from "./side-line";
import { StickyDayStarts } from "./static-day-starts";
import { Dots } from "./dots";
import { selectActiveDay } from "selectors/active-day";
import { setActiveDayAction } from "actions";

type EventsListProps = {
  scrollController: ScrollController;
};

export function EventsList({ scrollController }: EventsListProps) {
  const napEvents = useSelector(selectNapEvents);
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();
  const isSharePage = useSelector(selectIsSharePage);

  const eventsListState = useMemo(
    () => initEventsListState(napEvents, scrollController, isSharePage),
    [napEvents, scrollController, isSharePage]
  );

  useEffect(
    () => () => {
      eventsListState.destroy();
    },
    [eventsListState]
  );

  useEffect(
    () =>
      eventsListState.$activeDay.subscribe((newActiveDay) => {
        if (
          newActiveDay &&
          (!activeDay ||
            activeDay.getTime() !== newActiveDay.timestamp.getTime())
        ) {
          dispatch(setActiveDayAction(newActiveDay.timestamp));
        }
      }),
    [eventsListState, activeDay]
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
      {!isSharePage && <Footer scrollController={scrollController} />}
    </>
  );
}
