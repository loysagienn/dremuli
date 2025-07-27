import React, { ReactNode } from "react";
import styles from "./layout.module.css";
import { cn } from "utils/cn";
import { Navigation } from "components/navigation";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn(className, styles.layout)}>
      <Navigation className={styles.navigation} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
