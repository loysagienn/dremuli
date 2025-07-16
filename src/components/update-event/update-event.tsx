import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, updateEventAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./update-event.module.css";
import { selectRouteEvent } from "selectors";
import { EventType } from "types";

function toDatetimeLocalString(date: Date) {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const eventTitles: { [key in EventType]: string } = {
  fell_asleep: "Fell asleep",
  woke_up: "Woke up",
};

export function UpdateEvent() {
  const event = useSelector(selectRouteEvent);

  const [timeStr, setTimeStr] = useState(
    event?.timestamp ? toDatetimeLocalString(event.timestamp) : ""
  );

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!timeStr || !event) {
      return;
    }

    const timestamp = new Date(timeStr);

    dispatch(updateEventAction(event.id, { timestamp }));
  }, [timeStr, event]);

  const onDelete = useCallback(() => {
    if (!event) {
      return;
    }

    dispatch(deleteEventAction(event.id));
  }, [event]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>
            {eventTitles[event?.type] ?? "Update event"}
          </div>
          <FormInput
            label="Time"
            value={timeStr}
            onChange={setTimeStr}
            type="datetime-local"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Update" />
          <FormSubmit
            onSubmit={onDelete}
            submitLabel="Delete event"
            style="danger"
          />
        </div>
      </div>
    </div>
  );
}
