import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./test-page.module.css";
import { Header } from "components/header";
// import {
//   initInfiniteScrollController,
//   InfiniteItems,
// } from "components/scrolling";
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

  // useEffect(() => {
  //   if (inited) {
  //     const value = scrollController.$value.get();
  //     const visibleRangeValue = scrollController.$visibleRangeValue.get();
  //     console.log("value", value);
  //     console.log("visibleRangeValue", visibleRangeValue);
  //   }
  // }, [inited]);
  const value = useQuant(scrollController.$value);
  const visibleRangeValue = useQuant(scrollController.$visibleRangeValue);

  // console.log("inited", inited);
  console.log("value", value);
  console.log("visibleRangeValue", visibleRangeValue);

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
