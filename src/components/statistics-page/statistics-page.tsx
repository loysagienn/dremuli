import React, { useEffect, useRef, useState } from "react";
import styles from "./statistics-page.module.css";
import { Layout } from "components/layout";
import { useSelector } from "react-redux";
import { selectContentSize } from "selectors";
import { Statistics } from "./statistics";

export function StatisticsPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // client-side rendering only
  useEffect(() => {
    const contentNode = contentRef.current;

    if (contentNode) {
      contentNode.style.opacity = "1";
    }

    setHasMounted(true);
  }, []);

  return (
    <Layout>
      <div className={styles.content} ref={contentRef}>
        {hasMounted && <Statistics />}
      </div>
    </Layout>
  );
}
