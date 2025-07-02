import React, { ChangeEvent, useCallback, HTMLInputTypeAttribute } from "react";
import styles from "./input.module.css";
import { cn } from "utils/cn";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
  autoFocus?: boolean;
};

export function Input({
  value,
  onChange,
  className,
  type,
  autoFocus,
}: InputProps) {
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );

  return (
    <input
      className={cn(className, styles.root)}
      value={value}
      onChange={changeHandler}
      type={type}
      autoFocus={autoFocus}
    />
  );
}
