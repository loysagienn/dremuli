import React, { HTMLInputTypeAttribute } from "react";
import { Button } from "components/button";
import styles from "./form.module.css";
import { cn } from "utils/cn";

type FormInputProps = {
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
};

export function FormSubmit({
  submitLabel,
  className,
  onSubmit,
}: FormInputProps) {
  return (
    <div className={cn(className, styles.formSubmit)}>
      <Button onClick={onSubmit} className={styles.submitBtn}>
        {submitLabel || "Submit"}
      </Button>
    </div>
  );
}
