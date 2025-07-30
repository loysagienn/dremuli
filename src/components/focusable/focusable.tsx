import React, {
  ReactNode,
  useRef,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { addWindowEvent, removeWindowEvent } from "utils/browser";

type FocusableProps = {
  className?: string;
  children: ReactNode;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export function Focusable({
  className,
  children,
  focused,
  onFocus,
  onBlur,
}: FocusableProps) {
  const eventRef = useRef<MouseEvent | null>(null);

  const onClick = useCallback(
    (event: ReactMouseEvent) => {
      eventRef.current = event.nativeEvent;

      if (!focused) {
        onFocus();
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
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
