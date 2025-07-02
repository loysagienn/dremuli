import React, { ReactNode } from "react";
import { Link } from "components/router";
import { AppRoute } from "app/router";
import styles from "./button.module.css";
import { cn } from "utils/cn";

type ButtonProps = {
  route?: AppRoute;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  style?: "action" | "outline";
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
    <div className={cn(className, styles.root)} onClick={onClick}>
      {children}
    </div>
  );
}
