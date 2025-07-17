import React, { useCallback } from "react";
import styles from "./checkbox.module.css";
import Check from "svg/check.svg";
import { cn } from "utils/cn";

type CheckboxProps = {
  value: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export function Checkbox({ value, onChange, className }: CheckboxProps) {
  const toggle = useCallback(() => {
    if (onChange) {
      onChange(!value);
    }
  }, [value, onChange]);

  return (
    <div
      className={cn(className, styles.checkbox, value && styles.checked)}
      onClick={toggle}
    >
      <Check className={styles.check} />
    </div>
  );
}
