import React, {
  ReactNode,
  useRef,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
  RefObject,
} from "react";
import { addWindowEvent, removeWindowEvent } from "utils/browser";

type FocusableProps = {
  className?: string;
  children: ReactNode;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onClick?: () => void;
  innerRef?: RefObject<HTMLElement>;
};

export function Focusable({
  className,
  children,
  focused,
  onFocus,
  onBlur,
  onClick,
  innerRef,
}: FocusableProps) {
  const eventRef = useRef<MouseEvent | null>(null);

  const clickHandler = useCallback(
    (event: ReactMouseEvent) => {
      eventRef.current = event.nativeEvent;

      if (!focused) {
        onFocus();
      }

      if (onClick) {
        onClick();
      }
    },
    [focused, onFocus]
  );

  useEffect(() => {
    if (!focused) {
      return;
    }

    const onWindowClick = (event: MouseEvent) => {
      if (eventRef.current === event) {
        eventRef.current = null;

        return;
      }

      onBlur();
    };

    addWindowEvent("click", onWindowClick);

    return () => removeWindowEvent("click", onWindowClick);
  }, [focused, onBlur]);

  return (
    <div
      className={className}
      onClick={clickHandler}
      ref={innerRef as RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
}
