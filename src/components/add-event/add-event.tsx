import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNapAction, updateNapAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./add-event.module.css";
import { NapEventType } from "types";
import { selectLastEvent, selectNextEventType } from "selectors";

const eventTypeTitles: { [key in NapEventType]: string } = {
  [NapEventType.Awake]: "Woke up",
  [NapEventType.Sleep]: "Fell asleep",
};

export function AddEvent() {
  const [timeStr, setTimeStr] = useState("");
  const dispatch = useDispatch();
  const nextEventType = useSelector(selectNextEventType);
  const lastEvent = useSelector(selectLastEvent);

  const onSubmit = useCallback(() => {
    if (!timeStr) {
      return;
    }

    const time = new Date(timeStr);

    if (lastEvent && !lastEvent.nap.endTime) {
      const { nap } = lastEvent;

      dispatch(
        updateNapAction(nap.id, { startTime: nap.startTime, endTime: time })
      );
    } else {
      dispatch(createNapAction(time));
    }
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
