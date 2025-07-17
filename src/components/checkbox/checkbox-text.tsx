import React, { ReactNode, useCallback, MouseEvent } from "react";
import styles from "./checkbox.module.css";
import { cn } from "utils/cn";
import { Checkbox } from "./checkbox";

type CheckboxTextProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  children: ReactNode;
  className?: string;
};

export function CheckboxText({
  value,
  onChange,
  children,
  className,
}: CheckboxTextProps) {
  const toggle = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.defaultPrevented || event.metaKey) {
        return;
      }

      if (onChange) {
        onChange(!value);
      }
    },
    [value, onChange]
  );

  return (
    <div className={cn(className, styles.checkboxText)} onClick={toggle}>
      <Checkbox value={value} />
      <div className={styles.text}>{children}</div>
    </div>
  );
}
