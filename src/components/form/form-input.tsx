import React, { HTMLInputTypeAttribute } from "react";
import { Input } from "components/input";
import styles from "./form.module.css";
import { cn } from "utils/cn";

type FormInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
  autoFocus?: boolean;
};

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div className={cn(className, styles.formInput)}>
      <div className={styles.fieldLabel}>{label}</div>
      <Input {...props} />
    </div>
  );
}
