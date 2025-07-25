import React, { useMemo, useRef } from "react";
import styles from "./test-page.module.css";
import { Header } from "components/header";
import {
  InfiniteScroll,
  initInfiniteScrollController,
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
    const containerHeight = containerRef.current?.clientHeight ?? 500;

    const currentValue = value - (value % snapSize);

    const values: number[] = [];

    for (let i = -4; i <= 4; i++) {
      const val = currentValue + snapSize * i;

      values.push(val);
    }

    return values;
  }, [value]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container} ref={containerRef}>
          <InfiniteScroll
            scrollController={scrollController}
            className={styles.scroll}
          >
            <div className={styles.values}>
              {items.map((item) => {
                const containerHeight =
                  containerRef.current?.clientHeight ?? 500;
                const top = item - value - snapSize / 2 + containerHeight / 2;

                return (
                  <div
                    className={styles.item}
                    key={item}
                    style={{ top, height: snapSize }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
