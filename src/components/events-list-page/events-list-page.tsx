import React, { useEffect, useMemo } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import { Button } from "components/button";
import {
  ScrollContent,
  createScrollController,
} from "components/scroll-content";
import { EventsList } from "./events-list";
import { useQuant } from "utils/quant";
import { useSelector } from "react-redux";
import { selectNapEvents, selectNextEventType } from "selectors";
import { useText } from "lang/context";
import { EventType } from "types";

export function EventsListPage() {
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

  const { timelinePage: text } = useText();

  const napEvents = useSelector(selectNapEvents);

  const inited = useQuant(scrollController.$inited);

  const eventTypeTitles = useMemo<{ [key in EventType]: string }>(
    () => ({
      [EventType.WokeUp]: text.wokeUp,
      [EventType.FellAsleep]: text.fellAsleep,
    }),
    [text]
  );
  const nextEventType = useSelector(selectNextEventType);

  return (
    <Layout>
      <div className={styles.content}>
        {napEvents.length === 0 && (
          <div className={styles.noEvents}>
            <div className={styles.noEventsText}>{text.addSleepSession}</div>
            <div className={styles.noEventsBtnContainer}>
              <Button
                route={{ key: "create_event" }}
                className={styles.createNapBtn}
              >
                {eventTypeTitles[nextEventType]}
              </Button>
            </div>
          </div>
        )}

        {napEvents.length > 0 && (
          <>
            <div className={styles.activeDayContainer}>
              <ActiveDay className={styles.activeDay} />
            </div>
            <ScrollContent
              className={styles.eventsListContainer}
              scrollController={scrollController}
            >
              {inited && <EventsList scrollController={scrollController} />}
            </ScrollContent>
          </>
        )}
      </div>
    </Layout>
  );
}
