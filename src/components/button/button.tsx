import React, { ReactNode } from "react";
import { Link } from "components/router";
import { AppRoute } from "app/router";
import styles from "./button.module.css";
import { cn } from "utils/cn";

export type ButtonStyle = "action" | "outline" | "danger";

type ButtonProps = {
  route?: AppRoute;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  style?: ButtonStyle;
};

export function Button({
  route,
  onClick,
  className,
  children,
  style = "action",
}: ButtonProps) {
  if (route) {
    return (
      <Link
        className={cn(className, styles.root, styles[`style_${style}`])}
        route={route}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      className={cn(className, styles.root, styles[`style_${style}`])}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
