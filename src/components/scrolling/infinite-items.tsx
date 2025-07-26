import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./infinite-scroll.module.css";
import { InfiniteScroll } from "./infinite-scroll";
import {
  initInfiniteScrollController,
  InfiniteScrollController,
} from "./infinite-scroll-controller";
import { useStore } from "@nanostores/react";

type InfiniteItemsProps = {
  className?: string;
  getValueContent: (value: number, onClick: () => void) => ReactNode;
  scrollController: InfiniteScrollController;
};

export function InfiniteItems({
  className,
  scrollController,
  getValueContent,
}: InfiniteItemsProps) {
  const value = useStore(scrollController.$value);
  const containerSize = useStore(scrollController.$containerSize);

  const items = useMemo(() => {
    if (!containerSize) {
      return null;
    }

    const { snapSize, minValue, maxValue, direction } = scrollController;
    const currentValue = value - (value % snapSize);

    const values: number[] = [];

    const radius = containerSize / 2 - 5;
    const sectorLength = (Math.PI * radius) / 2;

    const valuesOffset = Math.ceil(sectorLength / snapSize);

    for (let i = -valuesOffset; i <= valuesOffset; i++) {
      const val = currentValue + snapSize * i;

      if (
        (minValue !== null && val < minValue) ||
        (maxValue !== null && val > maxValue)
      ) {
        continue;
      }

      values.push(val);
    }

    const items = values.map((val) => {
      let valueDiff = val - value;

      if (valueDiff > sectorLength) {
        valueDiff = sectorLength;
      } else if (valueDiff < -sectorLength) {
        valueDiff = -sectorLength;
      }

      const factor = valueDiff / sectorLength;
      const angle = (Math.PI / 2) * factor;
      const position =
        Math.sin(angle) * radius - snapSize / 2 + containerSize / 2;
      const size = snapSize;
      const scale = (Math.cos(angle) + 1) / 2;
      const opacity = (1 - Math.abs(factor)) ** 1.5;
      const transform = `scale(${scale}, ${scale}) ${
        direction === "vertical" ? "rotateX" : "rotateY"
      }(${angle}rad)`;
      const onClick = () => scrollController.updateValue(val);

      const style =
        direction === "vertical"
          ? { top: position, height: size, transform, opacity }
          : { left: position, width: size, transform, opacity };

      return (
        <div key={val} style={style} className={styles.item}>
          {getValueContent(val, onClick)}
        </div>
      );
    });

    return items;
  }, [value, containerSize, scrollController, getValueContent]);

  return (
    <InfiniteScroll className={className} scrollController={scrollController}>
      <div className={styles.itemsContainer}>{items}</div>
    </InfiniteScroll>
  );
}
