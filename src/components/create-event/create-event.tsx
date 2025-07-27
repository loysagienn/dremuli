import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "components/header";
import { FormSubmit } from "components/form";
import { DateTimePicker } from "components/time-picker";
import styles from "./create-event.module.css";
import { createEventAction, routeToAction } from "actions";
import { selectCurrentTime, selectNextEventType } from "selectors";
import { EventType } from "types";
import { Layout } from "components/layout";

const eventTypeTitles: { [key in EventType]: string } = {
  [EventType.WokeUp]: "Woke up",
  [EventType.FellAsleep]: "Fell asleep",
};

export function CreateEvent() {
  const currentTime = useSelector(selectCurrentTime);
  const [timeValue, setTimeValue] = useState(() => currentTime);
  const dispatch = useDispatch();
  const nextEventType = useSelector(selectNextEventType);

  const onSubmit = useCallback(() => {
    dispatch(createEventAction(nextEventType, timeValue));
  }, [timeValue]);

  const onCancel = useCallback(() => {
    dispatch(routeToAction({ key: "home" }));
  }, []);

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{eventTypeTitles[nextEventType]}</div>
          <DateTimePicker value={timeValue} onChange={setTimeValue} />
          <div className={styles.formSubmit}>
            <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
            <FormSubmit
              onSubmit={onCancel}
              submitLabel="Cancel"
              style="outline"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
