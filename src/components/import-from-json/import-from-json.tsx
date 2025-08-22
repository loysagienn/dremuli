import { cancelImportFromJsonAction } from "actions";
import { Modal } from "components/modal";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImportFromJsonVisible } from "selectors";
import styles from "./import-from-json.module.css";
import { useText } from "lang/context";

export function ImportFromJson() {
  const visible = useSelector(selectImportFromJsonVisible);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(cancelImportFromJsonAction());
  }, []);

  const { importFromJsonModal: text } = useText();

  return (
    <Modal onClose={onClose} className={styles.modal}>
      {visible && <>{text.inDevelopment}</>}
    </Modal>
  );
}
