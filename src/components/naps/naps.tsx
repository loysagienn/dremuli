import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./naps.module.css";
import { cn } from "utils/cn";
import { Event } from "./event";
import { Button } from "components/button";
import { ActiveDay } from "components/active-day";
import { useDispatch, useSelector } from "react-redux";
import { selectNapEvents, selectNextEventType } from "selectors";
import { NapEventType } from "types";
import { setActiveDayAction } from "actions";

type NapsProps = {
  className?: string;
};

const eventTypeTitles: { [key in NapEventType]: string } = {
  [NapEventType.Awake]: "Woke up",
  [NapEventType.Sleep]: "Fell asleep",
};

export function Naps({ className }: NapsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const napsListRef = useRef<HTMLDivElement>(null);
  const napEvents = useSelector(selectNapEvents);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const napsList = napsListRef.current;

    if (root && napsList) {
      if (napsList.scrollHeight > napsList.offsetHeight) {
        napsList.scrollTop = napsList.scrollHeight - napsList.offsetHeight;
      }

      root.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    const dayStartEvent = napEvents.filter((event) => event.dayStartStr);
    const napsList = napsListRef.current;

    if (dayStartEvent.length === 0) {
      return;
    }

    if (napsList) {
      const listRect = napsList.getBoundingClientRect();

      const eventsTop = dayStartEvent.map((event) => {
        const node = document.getElementById(event.id);

        if (node) {
          const nodeRect = node.getBoundingClientRect();

          return nodeRect.top - listRect.top + napsList.scrollTop;
        }

        return 0;
      });

      let currentActive: Date | null = null;

      const getActive = () => {
        const gapToBottom =
          napsList.scrollHeight - napsList.offsetHeight - napsList.scrollTop;

        if (gapToBottom < 60) {
          return dayStartEvent[dayStartEvent.length - 1].time;
        }

        for (let i = dayStartEvent.length - 1; i >= 0; i--) {
          const top = eventsTop[i];

          if (top - napsList.scrollTop < napsList.offsetHeight / 2) {
            return dayStartEvent[i].time;
          }
        }

        return dayStartEvent[0].time;
      };

      const onScroll = () => {
        const active = getActive();

        if (active === currentActive) {
          return;
        }

        currentActive = active;

        dispatch(setActiveDayAction(active));
      };

      napsList.addEventListener("scroll", onScroll);

      onScroll();

      return () => {
        napsList.removeEventListener("scroll", onScroll);
      };
    }
  }, [napEvents]);

  const nextEventType = useSelector(selectNextEventType);

  const lastEvent =
    napEvents.length > 0 ? napEvents[napEvents.length - 1] : null;
  const isSleeping = lastEvent && lastEvent.type === NapEventType.Sleep;

  return (
    <div className={cn(className, styles.root)} ref={rootRef}>
      <div className={styles.napsActiveDay}>
        <ActiveDay className={styles.activeDay} />
      </div>
      <div className={styles.napsList} ref={napsListRef}>
        <div className={styles.content}>
          {napEvents.map((napEvent) => (
            <Event napEvent={napEvent} key={napEvent.id} />
          ))}

          <Button route={{ key: "add_event" }} className={styles.createNapBtn}>
            {eventTypeTitles[nextEventType]}
          </Button>
        </div>
      </div>
    </div>
  );
}
