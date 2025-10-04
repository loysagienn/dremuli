import React, { useMemo } from "react";
import styles from "./text-value.module.css";

type TextValueProps = {
  value: string;
};

export function TextValue({ value }: TextValueProps) {
  const parts = useMemo(
    () => value.split("\n").map((part) => part.trim()),
    [value]
  );

  return (
    <>
      {parts.map((part, index) => (
        <div key={index} className={styles.part}>
          {part}
        </div>
      ))}
    </>
  );
}
