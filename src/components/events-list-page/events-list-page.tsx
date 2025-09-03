import React, { useEffect, useMemo } from "react";
import styles from "./events-list-page.module.css";
import { Layout } from "components/layout";
import { ActiveDay } from "components/active-day";
import {
  ScrollContent,
  createScrollController,
} from "components/scroll-content";
import { EventsList } from "./events-list";
import { useQuant } from "utils/quant";

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

  const inited = useQuant(scrollController.$inited);

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
          {inited && <EventsList scrollController={scrollController} />}
        </ScrollContent>
      </div>
    </Layout>
  );
}
