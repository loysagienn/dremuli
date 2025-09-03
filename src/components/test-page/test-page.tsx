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
        scalingEnabled: false,
        snappingEnabled: true,
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

  const [rangeStart, rangeEnd] = useQuant(scrollController.$visibleRangeValue);
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const items = useMemo(() => {
    let item = Math.floor(rangeStart / snapSize) * snapSize;
    const items = [item];

    while (item < rangeEnd) {
      item += 100;

      items.push(item);
    }

    return items;
  }, [rangeStart, rangeEnd]);

  console.log("items", items);

  const inited = useQuant(scrollController.$inited);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <ScrollContent
            scrollController={scrollController}
            className={styles.scroll}
          >
            {items.map((item) => {
              const top = item - scrollStartValue - snapSize / 2;

              return (
                <div className={styles.item} style={{ top }} key={item}>
                  {item}
                </div>
              );
            })}
          </ScrollContent>
        </div>
      </div>
    </div>
  );
}
