import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createNapAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./create-nap.module.css";

export function CreateNap() {
  const [startTimeStr, setStartTime] = useState("");
  const [endTimeStr, setEndTime] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!startTimeStr) {
      return;
    }

    const startTime = new Date(startTimeStr);
    const endTime = endTimeStr ? new Date(endTimeStr) : null;

    dispatch(createNapAction(startTime, endTime));
  }, [startTimeStr, endTimeStr]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Create nap</div>
          <FormInput
            label="Start time"
            value={startTimeStr}
            onChange={setStartTime}
            autoFocus
            type="datetime-local"
          />
          <FormInput
            label="End time"
            value={endTimeStr}
            onChange={setEndTime}
            type="datetime-local"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Create" />
        </div>
      </div>
    </div>
  );
}
