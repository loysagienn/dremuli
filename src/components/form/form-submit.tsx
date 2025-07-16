import React, { HTMLInputTypeAttribute } from "react";
import { Button, ButtonStyle } from "components/button";
import styles from "./form.module.css";
import { cn } from "utils/cn";

type FormInputProps = {
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
  style?: ButtonStyle;
};

export function FormSubmit({
  submitLabel,
  className,
  onSubmit,
  style,
}: FormInputProps) {
  return (
    <div className={cn(className, styles.formSubmit)}>
      <Button onClick={onSubmit} className={styles.submitBtn} style={style}>
        {submitLabel || "Submit"}
      </Button>
    </div>
  );
}
