import { Popup } from "components/popup";
import React, { ReactNode, useCallback, useRef } from "react";
import styles from "./modal.module.css";
import { TransitionRender } from "components/transition-render";
import { cn } from "utils/cn";

type ModalProps = {
  children?: ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
};

export function Modal({ children, title, onClose, className }: ModalProps) {
  const modalClickRef = useRef<boolean>(false);

  const onModalClick = useCallback(() => {
    modalClickRef.current = true;
  }, []);

  const onRootClick = useCallback(() => {
    if (modalClickRef.current) {
      modalClickRef.current = false;
    } else {
      if (onClose) {
        onClose();
      }
    }
  }, [onClose]);

  return (
    <TransitionRender
      className={styles.root}
      hiddenClassName={styles.hidden}
      onClick={onRootClick}
    >
      {children && (
        <div className={styles.wrapper}>
          <div className={cn(className, styles.modal)} onClick={onModalClick}>
            {children}
          </div>
        </div>
      )}
    </TransitionRender>
  );
}
