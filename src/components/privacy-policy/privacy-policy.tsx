import React, { lazy, Suspense } from "react";
import styles from "./privacy-policy.module.css";
import { Header } from "components/header";

const Content = lazy(() => import("./content"));

export function PrivacyPolicy() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.title}>Privacy Policy</div>
          <Suspense>
            <Content />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
