import React, { useCallback, useMemo } from "react";
import styles from "./confirm-modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "components/modal";
import { selectConfirmAction } from "selectors";
import { confirmApproveAction, confirmDeclineAction } from "actions";
import { useText } from "lang/context";
import Close from "svg/close.svg";
import { Button, ButtonStyle } from "components/button";
import { ConfirmableAction } from "types";

type ActionOptions = {
  title: string;
  approveBtnStyle: ButtonStyle;
  approveText: string;
  declineText: string;
};

function useOptions(action: ConfirmableAction): ActionOptions {
  const { confirmModal: text } = useText();

  return useMemo(() => {
    if (action?.type === "DELETE_EVENT") {
      return {
        title: text.deleteEvent,
        approveBtnStyle: "danger",
        approveText: text.delete,
        declineText: text.decline,
      };
    }

    return {
      title: text.confirm,
      approveBtnStyle: "action",
      approveText: text.approve,
      declineText: text.decline,
    };
  }, [text, action]);
}

export function ConfirmModal() {
  const dispatch = useDispatch();
  const confirmAction = useSelector(selectConfirmAction);
  const { title, approveBtnStyle, approveText, declineText } =
    useOptions(confirmAction);

  const approve = useCallback(() => {
    if (confirmAction) {
      dispatch(confirmApproveAction(confirmAction));
    }
  }, [confirmAction]);

  const decline = useCallback(() => {
    if (confirmAction) {
      dispatch(confirmDeclineAction(confirmAction));
    }
  }, [confirmAction]);

  return (
    <Modal className={styles.modal} onClose={decline}>
      {confirmAction && (
        <>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <div className={styles.closeBtn} onClick={decline}>
              <Close className={styles.closeIcon} />
            </div>
          </div>
          <div className={styles.footer}>
            <Button
              className={styles.button}
              onClick={approve}
              style={approveBtnStyle}
            >
              {approveText}
            </Button>
            <Button className={styles.button} style="outline" onClick={decline}>
              {declineText}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
