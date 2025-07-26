import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEventAction, updateEventAction, routeToAction } from "actions";
import { Header } from "components/header";
import { FormSubmit } from "components/form";
import styles from "./update-event.module.css";
import { Event, EventType } from "types";
import { DateTimePicker } from "components/time-picker";

const eventTitles: { [key in EventType]: string } = {
  [EventType.FellAsleep]: "Fell asleep",
  [EventType.WokeUp]: "Woke up",
};

type UpdateEventFormProps = {
  event: Event;
};

export function UpdateEventForm({ event }: UpdateEventFormProps) {
  const [timeValue, setTimeValue] = useState(event.timestamp);

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    const timestamp = timeValue;

    dispatch(updateEventAction(event.id, { timestamp }));
  }, [timeValue, event]);

  const onDelete = useCallback(() => {
    if (!event) {
      return;
    }

    dispatch(deleteEventAction(event.id));
  }, [event]);

  const onCancel = useCallback(() => {
    dispatch(routeToAction({ key: "home" }));
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>
            {eventTitles[event?.type] ?? "Update event"}
          </div>
          <DateTimePicker value={timeValue} onChange={setTimeValue} />

          <div className={styles.formSubmit}>
            <FormSubmit onSubmit={onSubmit} submitLabel="Update event" />
            <FormSubmit
              onSubmit={onCancel}
              submitLabel="Cancel"
              style="outline"
            />
            <FormSubmit
              onSubmit={onDelete}
              submitLabel="Delete event"
              style="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
