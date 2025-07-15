import React from "react";
import styles from "./home.module.css";
import { Header } from "components/header";
import { Naps } from "components/naps";

export function Home() {
  return (
    <div className={styles.root}>
      <Header />
      <Naps className={styles.content} />
    </div>
  );
}
