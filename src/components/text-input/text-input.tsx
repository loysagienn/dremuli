import React, { ChangeEvent, useCallback } from "react";

import styles from "./text-input.module.css";
import { cn } from "utils/cn";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function TextInput({
  value,
  onChange,
  placeholder,
  className,
}: TextInputProps) {
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <textarea
      className={cn(styles.input, className)}
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
    />
  );
}
