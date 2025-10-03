import React, { useMemo } from "react";

type TextValueProps = {
  value: string;
};

export function TextValue({ value }: TextValueProps) {
  const parts = useMemo(() => value.split("\n"), [value]);

  return (
    <>
      {parts.map((part, index) => (
        <div key={index}>{part}</div>
      ))}
    </>
  );
}
