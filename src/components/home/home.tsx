import React from "react";
import { useState, useEffect } from "react";
import styles from "./home.module.css";
import { Naps } from "components/naps";
import { Layout } from "components/layout";

export function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  // client-side rendering only
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <Layout>{hasMounted && <Naps className={styles.content} />}</Layout>;
}
