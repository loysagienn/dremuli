import React, { memo, ReactNode, useMemo } from "react";
import styles from "./scroll-content.module.css";
import { ScrollController } from "./scroll-controller";
import { useQuant } from "utils/quant";

type SnapTargetProps = {
  scrollController: ScrollController;
};

function SnapItems({ scrollController }: SnapTargetProps) {
  const { snapSize } = scrollController;
  const scrollableLength = useQuant(scrollController.$scrollableLength);

  const itemsCount = Math.floor(scrollableLength / snapSize);

  const itemsContent: ReactNode[] = [];

  for (let i = 0; i < itemsCount; i++) {
    itemsContent.push(
      <div
        className={styles.snapTargetItem}
        key={i}
        style={{ top: i * snapSize, height: snapSize }}
      />
    );
  }

  return <>{itemsContent}</>;
}

const EnhancedSnapItems = memo(SnapItems);

export { EnhancedSnapItems as SnapItems };
