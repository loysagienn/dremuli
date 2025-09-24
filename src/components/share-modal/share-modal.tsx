import {
  showShareModalAction,
  cancelShareModalAction,
  shareEventsAction,
} from "actions";
import { Modal } from "components/modal";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDay,
  selectShareLink,
  selectShareModalOpened,
} from "selectors";
import styles from "./share-modal.module.css";
import Close from "svg/close.svg";
import { useText } from "lang/context";
import { DatePicker } from "components/time-picker";
import { Button } from "components/button";

export function ShareModal() {
  const currentDay = useSelector(selectCurrentDay);
  const [dateFrom, setDateFrom] = useState(currentDay);
  const visible = useSelector(selectShareModalOpened);
  const shareLink = useSelector(selectShareLink);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(cancelShareModalAction());
  }, []);

  const { shareModal: text } = useText();

  const processExport = useCallback(() => {
    dispatch(shareEventsAction(dateFrom));
  }, [dateFrom]);

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
          {shareLink && (
            <>
              <div className={styles.shareLinkTitle}>{text.shareLinkTitle}</div>
              <div className={styles.shareLink}>{shareLink}</div>
            </>
          )}
          {!shareLink && (
            <>
              <div className={styles.formPart}>
                <div className={styles.formTitle}>{text.fromDate}</div>
                <DatePicker
                  className={styles.datePicker}
                  value={dateFrom}
                  onChange={setDateFrom}
                />
              </div>
              <div className={styles.submit}>
                <Button onClick={processExport}>{text.createLink}</Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
