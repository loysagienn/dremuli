import React, { useCallback, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { deleteEventAction, updateEventAction, routeToAction } from "actions";
import { Header } from "components/header";
import { FormSubmit } from "components/form";
import styles from "./update-event.module.css";
import { Event, EventType } from "types";
import { DateTimePicker } from "components/time-picker";
import { Layout } from "components/layout";
import { useText } from "lang/context";

type UpdateEventFormProps = {
  event: Event;
};

export function UpdateEventForm({ event }: UpdateEventFormProps) {
  const { updateEvent: text } = useText();

  const eventTitles = useMemo<{ [key in EventType]: string }>(
    () => ({
      [EventType.WokeUp]: text.wokeUp,
      [EventType.FellAsleep]: text.fellAsleep,
    }),
    [text]
  );

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
    <Layout>
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>
            {eventTitles[event?.type] ?? text.title}
          </div>
          <DateTimePicker value={timeValue} onChange={setTimeValue} />

          <div className={styles.formSubmit}>
            <FormSubmit onSubmit={onSubmit} submitLabel={text.submit} />
            <FormSubmit
              onSubmit={onCancel}
              submitLabel={text.cancel}
              style="outline"
            />
            <FormSubmit
              onSubmit={onDelete}
              submitLabel={text.delete}
              style="danger"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
