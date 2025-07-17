import React, { lazy, Suspense } from "react";
import styles from "./terms-of-use.module.css";
import { Header } from "components/header";

const Content = lazy(() => import("./content"));

export function TermsOfUse() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Terms of Use</div>
          <Suspense>
            <Content />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
