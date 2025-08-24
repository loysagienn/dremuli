import { cancelExportToJsonAction, exportToJsonAction } from "actions";
import { Modal } from "components/modal";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentDay, selectExportToJsonVisible } from "selectors";
import styles from "./export-to-json.module.css";
import Close from "svg/close.svg";
import { useText } from "lang/context";
import { DatePicker } from "components/time-picker";
import { Button } from "components/button";

export function ExportToJson() {
  const currentDay = useSelector(selectCurrentDay);
  const [dateFrom, setDateFrom] = useState(currentDay);
  const [dateTo, setDateTo] = useState(currentDay);
  const visible = useSelector(selectExportToJsonVisible);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(cancelExportToJsonAction());
  }, []);

  const { exportToJsonModal: text } = useText();

  const processExport = useCallback(() => {
    dispatch(exportToJsonAction(dateFrom, dateTo));
  }, [dateFrom, dateTo]);

  return (
    <Modal onClose={onClose} className={styles.modal}>
      {visible && (
        <>
          <div className={styles.header}>
            <div className={styles.title}>{text.title}</div>
            <div className={styles.closeBtn} onClick={onClose}>
              <Close className={styles.closeIcon} />
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.formPart}>
              <div className={styles.formTitle}>{text.fromDate}</div>
              <DatePicker
                className={styles.datePicker}
                value={dateFrom}
                onChange={setDateFrom}
              />
            </div>
            <div className={styles.formPart}>
              <div className={styles.formTitle}>{text.toDate}</div>
              <DatePicker
                className={styles.datePicker}
                value={dateTo}
                onChange={setDateTo}
              />
            </div>
          </div>
          <div className={styles.submit}>
            <Button onClick={processExport}>{text.export}</Button>
          </div>
        </>
      )}
    </Modal>
  );
}
