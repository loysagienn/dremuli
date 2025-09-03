import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./test-page.module.css";
import { Header } from "components/header";
import {
  ScrollContent,
  createScrollController,
} from "components/scroll-content";
import { useQuant } from "utils/quant";

const snapSize = 100;

export function TestPage() {
  const scrollController = useMemo(
    () =>
      createScrollController({
        defaultValue: 0,
        defaultScale: 1,
        scalingEnabled: true,
        valuePosition: 0.5,
        direction: "vertical",
      }),
    []
  );

  useEffect(
    () => () => {
      scrollController.destroy();
    },
    [scrollController]
  );

  const inited = useQuant(scrollController.$inited);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <ScrollContent
            scrollController={scrollController}
            className={styles.scroll}
          />
        </div>
      </div>
    </div>
  );
}
