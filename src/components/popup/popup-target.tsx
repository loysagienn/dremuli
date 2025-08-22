import React, { createContext, ReactNode, RefObject, useRef } from "react";

export const popupTargetContext =
  createContext<RefObject<HTMLDivElement> | null>(null);

const { Provider: PopupTargetProvider } = popupTargetContext;

type PopupTargetProps = {
  className?: string;
  children?: ReactNode;
};

export function PopupTarget({ className, children }: PopupTargetProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PopupTargetProvider value={ref}>
      <div className={className} ref={ref}>
        {children}
      </div>
    </PopupTargetProvider>
  );
}

export { PopupTargetProvider };
