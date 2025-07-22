import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import { DatePicker } from "components/time-picker";
import styles from "./create-event.module.css";
import { selectNextEventType } from "selectors";
import { EventType } from "types";
import { TestAnimation } from "./test-animation";

const eventTypeTitles: { [key in EventType]: string } = {
  [EventType.WokeUp]: "Woke up",
  [EventType.FellAsleep]: "Fell asleep",
};

export function CreateEvent() {
  const [timeValue, setTimeValue] = useState(() => new Date());
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
          <DatePicker value={timeValue} onChange={setTimeValue} />
          <FormSubmit onSubmit={onSubmit} submitLabel="Submit" />
        </div>
      </div>
      <TestAnimation />
    </div>
  );
}
