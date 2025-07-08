import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNapAction, updateNapAction } from "actions";
import { Header } from "components/header";
import { FormInput, FormSubmit } from "components/form";
import styles from "./update-nap.module.css";
import { selectRouteNap } from "selectors";

function toDatetimeLocalString(date: Date) {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function UpdateNap() {
  const nap = useSelector(selectRouteNap);

  const [startTimeStr, setStartTime] = useState(
    nap?.startTime ? toDatetimeLocalString(nap.startTime) : ""
  );

  const [endTimeStr, setEndTime] = useState(
    nap?.endTime ? toDatetimeLocalString(nap.endTime) : ""
  );
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    if (!startTimeStr || !nap) {
      return;
    }

    const startTime = new Date(startTimeStr);
    const endTime = endTimeStr ? new Date(endTimeStr) : null;

    dispatch(updateNapAction(nap.id, { startTime, endTime }));
  }, [startTimeStr, endTimeStr, nap]);

  const onDelete = useCallback(() => {
    if (!nap) {
      return;
    }

    dispatch(deleteNapAction(nap.id));
  }, [nap]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Update nap</div>
          <FormInput
            label="Start time"
            value={startTimeStr}
            onChange={setStartTime}
            type="datetime-local"
          />
          <FormInput
            label="End time"
            value={endTimeStr}
            onChange={setEndTime}
            type="datetime-local"
          />
          <FormSubmit onSubmit={onSubmit} submitLabel="Update" />
          <FormSubmit onSubmit={onDelete} submitLabel="Delete nap" />
        </div>
      </div>
    </div>
  );
}
