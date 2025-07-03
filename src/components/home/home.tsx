import React from "react";
import styles from "./home.module.css";
import { Header } from "components/header";

export function Home() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>content</div>
    </div>
  );
}
