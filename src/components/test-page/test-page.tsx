import React, { useCallback, useMemo, useRef } from "react";
import styles from "./test-page.module.css";
import { Header } from "components/header";
import {
  InfiniteScroll,
  initInfiniteScrollController,
  InfiniteItems,
} from "components/scrolling";
import { useStore } from "@nanostores/react";

const snapSize = 100;

export function TestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollController = useMemo(
    () => initInfiniteScrollController({ direction: "vertical", snapSize }),
    []
  );

  const value = useStore(scrollController.$value);

  const items = useMemo(() => {
    const currentValue = value - (value % snapSize);

    const values: number[] = [];

    for (let i = -8; i <= 8; i++) {
      const val = currentValue + snapSize * i;

      values.push(val);
    }

    return values;
  }, [value]);

  const getValueContent = useCallback((value: number, onClick: () => void) => {
    return (
      <div className={styles.item} key={value} onClick={onClick}>
        {value}
      </div>
    );
  }, []);
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container} ref={containerRef}>
          <InfiniteItems
            scrollController={scrollController}
            className={styles.scroll}
            getValueContent={getValueContent}
          ></InfiniteItems>
        </div>
      </div>
    </div>
  );
}
