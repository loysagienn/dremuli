import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./add-event.module.css";
import { selectNextEventType } from "selectors";
import { EventType } from "types";

const eventTypeTitles: { [key in EventType]: string } = {
  [EventType.WokeUp]: "Woke up",
  [EventType.FellAsleep]: "Fell asleep",
};

export function AddEvent() {
  const [timeStr, setTimeStr] = useState("");
  const dispatch = useDispatch();
  const nextEventType = useSelector(selectNextEventType);

  const onSubmit = useCallback(() => {
    if (!timeStr) {
      return;
    }

    const time = new Date(timeStr);
    dispatch(createEventAction(nextEventType, time));
  }, [timeStr]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>{eventTypeTitles[nextEventType]}</div>
          <FormInput
            label="Time"
            value={timeStr}
            onChange={setTimeStr}
            autoFocus
            type="datetime-local"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
        </div>
      </div>
    </div>
  );
}
