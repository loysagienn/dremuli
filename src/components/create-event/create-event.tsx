import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "components/header";
import { FormSubmit } from "components/form";
import { DateTimePicker } from "components/time-picker";
import styles from "./create-event.module.css";
import { createEventAction } from "actions";
import { selectCurrentTime, selectNextEventType } from "selectors";
import { EventType } from "types";

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

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{eventTypeTitles[nextEventType]}</div>
          <DateTimePicker value={timeValue} onChange={setTimeValue} />
          <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
        </div>
      </div>
    </div>
  );
}
