import React, { ReactNode, RefObject } from "react";
import { Link } from "components/router";
import { AppRoute } from "app/router";
import { Focusable } from "components/focusable";
import styles from "./button.module.css";
import { cn } from "utils/cn";

export type ButtonStyle = "action" | "outline" | "danger";

type ButtonProps = {
  route?: AppRoute;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  style?: ButtonStyle;
  innerRef?: RefObject<HTMLElement>;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function Button({
  route,
  onClick,
  className,
  children,
  style = "action",
  innerRef,
  focused = null,
  onFocus,
  onBlur,
}: ButtonProps) {
  if (route) {
    return (
      <Link
        className={cn(className, styles.root, styles[`style_${style}`])}
        route={route}
        onClick={onClick}
        innerRef={innerRef}
      >
        {children}
      </Link>
    );
  }

  if (focused !== null && onFocus && onBlur) {
    return (
      <Focusable
        className={cn(className, styles.root, styles[`style_${style}`])}
        focused={focused}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        innerRef={innerRef}
      >
        {children}
      </Focusable>
    );
  }
  return (
    <div
      className={cn(className, styles.root, styles[`style_${style}`])}
      onClick={onClick}
      ref={innerRef as RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
}
