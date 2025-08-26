import { cancelImportFromJsonAction, importFromJsonFile } from "actions";
import { Modal } from "components/modal";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectImportFromJsonCreatingEvents,
  selectImportFromJsonError,
  selectImportFromJsonReading,
  selectImportFromJsonVisible,
} from "selectors";
import styles from "./import-from-json.module.css";
import { useText } from "lang/context";
import CloseSvg from "svg/close.svg";
import { DropFile } from "components/drop-file";

export function ImportFromJson() {
  const visible = useSelector(selectImportFromJsonVisible);
  const reading = useSelector(selectImportFromJsonReading);
  const errorMessage = useSelector(selectImportFromJsonError);
  const creatingEvents = useSelector(selectImportFromJsonCreatingEvents);

  const [validationError, setValidationError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(cancelImportFromJsonAction());
  }, []);

  const { importFromJsonModal: text } = useText();

  const onSelectFile = useCallback((file: File) => {
    dispatch(importFromJsonFile(file));
  }, []);

  return (
    <Modal onClose={onClose} className={styles.modal}>
      {visible && (
        <>
          <div className={styles.header}>
            <div className={styles.title}>{text.title}</div>
            <div className={styles.closeBtn} onClick={onClose}>
              <CloseSvg className={styles.closeIcon} />
            </div>
          </div>
          <DropFile
            onSelectFile={onSelectFile}
            className={styles.dropFile}
            disabled={reading || creatingEvents}
          />
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </>
      )}
    </Modal>
  );
}
