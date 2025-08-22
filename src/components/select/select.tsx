import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./select.module.css";
import { Option } from "types";
import { cn } from "utils/cn";
import { Focusable } from "components/focusable";
import { TransitionRender } from "components/transition-render";
import ArrowDown from "svg/arrow-down.svg";
import { Popup, PopupPosition } from "components/popup";

type SelectProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  popupPosition?: PopupPosition;
};

export function Select({
  value,
  options,
  onChange,
  className,
  popupPosition,
}: SelectProps) {
  const ref = useRef<HTMLElement>(null);
  const [isOpened, setOpened] = useState(false);
  const activeValue = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);
  const toggle = useCallback(() => setOpened(!isOpened), [isOpened]);

  const onOptionClick = (value: string) => () => {
    close();
    onChange(value);
  };

  return (
    <Focusable
      className={cn(className, styles.select)}
      focused={isOpened}
      onFocus={open}
      onBlur={close}
      innerRef={ref}
    >
      <div className={styles.value}>{activeValue.label}</div>
      <ArrowDown className={styles.arrowIcon} />
      <Popup
        className={styles.popup}
        targetRef={ref}
        offset={6}
        position={popupPosition ?? "bottom-left"}
      >
        {isOpened && (
          <>
            {options.map((option) => (
              <div
                className={cn(
                  styles.option,
                  option.value === value && styles.isActive
                )}
                key={option.value}
                onClick={onOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </>
        )}
      </Popup>
    </Focusable>
  );
}
