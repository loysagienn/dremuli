import { cancelExportToJsonAction } from "actions";
import { Modal } from "components/modal";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExportToJsonVisible } from "selectors";
import styles from "./export-to-json.module.css";
import { useText } from "lang/context";

export function ExportToJson() {
  const visible = useSelector(selectExportToJsonVisible);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(cancelExportToJsonAction());
  }, []);

  const { exportToJsonModal: text } = useText();

  return (
    <Modal onClose={onClose} className={styles.modal}>
      {visible && <>{text.inDevelopment}</>}
    </Modal>
  );
}
