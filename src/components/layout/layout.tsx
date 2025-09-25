import React, { ReactNode } from "react";
import styles from "./layout.module.css";
import { cn } from "utils/cn";
import { Navigation, ShareNavigation } from "components/navigation";
import { useSelector } from "react-redux";
import { selectIsSharePage, selectRoute } from "selectors";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export function Layout({ children, className }: LayoutProps) {
  const isSharePage = useSelector(selectIsSharePage);

  return (
    <div className={cn(className, styles.layout)}>
      {isSharePage ? (
        <ShareNavigation className={styles.navigation} />
      ) : (
        <Navigation className={styles.navigation} />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
