import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./events-timeline.module.css";
import { Layout } from "components/layout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSharePage, selectNapEvents } from "selectors";
import { ActiveDay } from "components/active-day";
import { ReverseScroll } from "components/reverse-scroll";
import { TimelineEvent } from "./timeline-event";
import { DayStart } from "./day-start";
import { Footer } from "./footer";
import { cn } from "utils/cn";
import { DayStartProvider, useDayStartContextValue } from "./day-start-context";
import { selectActiveDay } from "selectors/active-day";
import { setActiveDayAction } from "actions";

export function EventsTimeline() {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const contentRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  const dayStartContextValue = useDayStartContextValue(eventsContainerRef);
  const napEvents = useSelector(selectNapEvents);
  const isSharePage = useSelector(selectIsSharePage);
  const [renderOffset, setRenderOffset] = useState(
    Math.max(napEvents.length - 50, 0)
  );
  const [containerHeight, setContainerHeight] = useState(10000);

  const eventsContent = useMemo(() => {
    const eventsContent: ReactNode[] = [];

    for (let i = renderOffset; i < napEvents.length; i++) {
      const event = napEvents[i];

      if (event.dayStartStr) {
        eventsContent.push(
          <DayStart key={`ds-${event.id}`} napEvent={event} />
        );
      }

      eventsContent.push(<TimelineEvent key={event.id} napEvent={event} />);
    }

    return eventsContent;
  }, [napEvents, renderOffset]);

  const onScroll = useCallback(
    (scrollSize: number) => {
      const eventsContainer = eventsContainerRef.current;

      if (!eventsContainer) {
        return;
      }

      const containerHeight = eventsContainer.clientHeight;

      const spaceToTop = containerHeight - scrollSize;

      if (spaceToTop < 2000) {
        const newRenderOffset = Math.max(renderOffset - 20, 0);

        if (newRenderOffset !== renderOffset) {
          setRenderOffset(newRenderOffset);
        }
      }

      const contentNode = contentRef.current;
      const dayStartNodes = dayStartContextValue.dayStartNodes;

      if (contentNode && dayStartNodes.length > 0) {
        const contentHeight = contentNode.clientHeight;
        const middle = scrollSize - contentHeight / 2;

        let activeNodeIndex = 0;

        if (scrollSize - contentHeight > 10) {
          while (activeNodeIndex < dayStartNodes.length - 1) {
            if (dayStartNodes[activeNodeIndex].bottom > middle) {
              break;
            }

            activeNodeIndex++;
          }
        }

        const activeNode = dayStartNodes[activeNodeIndex];
        const newActiveDay = activeNode.napEvent.timestamp;

        if (newActiveDay.getTime() !== activeDay?.getTime()) {
          dispatch(setActiveDayAction(newActiveDay));
        }
      }
    },
    [renderOffset, activeDay]
  );

  useEffect(() => {
    const eventsContainer = eventsContainerRef.current;

    if (!eventsContainer) {
      return;
    }

    if (renderOffset === 0) {
      setContainerHeight(eventsContainer.clientHeight);
    } else {
      setContainerHeight(eventsContainer.clientHeight + 10000);
    }
  }, [renderOffset]);

  return (
    <Layout>
      <DayStartProvider value={dayStartContextValue}>
        <div className={cn(styles.content, isSharePage && styles.isSharePage)}>
          <div className={styles.activeDayContainer}>
            <ActiveDay className={styles.activeDay} />
          </div>
          <div className={styles.eventsListContainer} ref={contentRef}>
            <ReverseScroll
              className={styles.reverseScroll}
              onScroll={onScroll}
              containerHeight={containerHeight}
            >
              <div className={styles.eventsList}>
                <div
                  className={styles.eventsContainer}
                  ref={eventsContainerRef}
                >
                  <div className={styles.sideLine} />
                  {eventsContent}
                  {!isSharePage && <Footer />}
                </div>
              </div>
            </ReverseScroll>
          </div>
        </div>
      </DayStartProvider>
    </Layout>
  );
}
