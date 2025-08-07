import React, { ReactNode, useMemo } from "react";
import styles from "./infinite-scroll.module.css";
import { InfiniteScroll } from "./infinite-scroll";
import { InfiniteScrollController } from "./scroll-controller";
import { useQuant } from "utils/quant";

type InfiniteItemsProps = {
  className?: string;
  getValueContent: (value: number, onClick: () => void) => ReactNode;
  scrollController: InfiniteScrollController;
  itemSize?: number;
};

export function InfiniteItems({
  className,
  scrollController,
  getValueContent,
  itemSize,
}: InfiniteItemsProps) {
  const value = useQuant(scrollController.$value);
  const scale = useQuant(scrollController.$scale);
  const containerSize = useQuant(scrollController.$containerSize);

  const items = useMemo(() => {
    if (!containerSize) {
      return null;
    }

    const { minValue, maxValue, direction } = scrollController;

    const snapSize = scrollController.snapSize || itemSize;

    const currentValue = Math.round(value / snapSize) * snapSize;
    const pixelSnapSize = snapSize / scale;

    const values: number[] = [];

    const radius = containerSize / 2 - 5;
    const sectorLength = (Math.PI * radius) / 2;

    const valuesOffset = Math.ceil(sectorLength / pixelSnapSize);

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
      let valueDiffPixel = (val - value) / scale;

      if (valueDiffPixel > sectorLength) {
        valueDiffPixel = sectorLength;
      } else if (valueDiffPixel < -sectorLength) {
        valueDiffPixel = -sectorLength;
      }

      const factor = valueDiffPixel / sectorLength;
      const angle = (Math.PI / 2) * factor;
      const position =
        Math.sin(angle) * radius - pixelSnapSize / 2 + containerSize / 2;
      const size = pixelSnapSize;
      const transformScale = (Math.cos(angle) + 1) / 2;
      const opacity =
        val === currentValue ? 1 : (1 - Math.abs(factor)) ** 2 * 0.8;
      const transform = `scale(${transformScale}, ${transformScale}) ${
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
  }, [value, scale, containerSize, scrollController, getValueContent]);

  return (
    <InfiniteScroll className={className} scrollController={scrollController}>
      <div className={styles.itemsContainer}>{items}</div>
    </InfiniteScroll>
  );
}
