import React from "react";
import { useState, useEffect } from "react";
import styles from "./home.module.css";
import { Header } from "components/header";
import { Naps } from "components/naps";

export function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  // client-side rendering only
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      {hasMounted && <Naps className={styles.content} />}
    </div>
  );
}
