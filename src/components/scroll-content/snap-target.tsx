import React, { memo, ReactNode, useMemo } from "react";
import styles from "./scroll-content.module.css";
import { ScrollController } from "./scroll-controller";
import { useQuant } from "utils/quant";
import { SnapItems } from "./snap-items";

type SnapTargetProps = {
  scrollController: ScrollController;
};

function SnapTarget({ scrollController }: SnapTargetProps) {
  const { snapSize } = scrollController;
  const scrollStartValue = useQuant(scrollController.$scrollStartValue);

  const shift =
    Math.ceil((scrollStartValue - snapSize / 2) / snapSize) * snapSize +
    snapSize / 2 -
    scrollStartValue;

  return (
    <div className={styles.snapTarget} style={{ top: shift }}>
      <SnapItems scrollController={scrollController} />
    </div>
  );
}

const EnhancedSnapTarget = memo(SnapTarget);

export { EnhancedSnapTarget as SnapTarget };
