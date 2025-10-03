import React, { useCallback, useEffect, useRef } from "react";

import styles from "./reverse-scroll.module.css";
import { cn } from "utils/cn";

type ReverseScrollProps = {
  children: React.ReactNode;
  containerHeight: number;
  className?: string;
  onScroll?: (scrollSize: number) => void;
};

export function ReverseScroll({
  children,
  containerHeight,
  className,
  onScroll,
}: ReverseScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeightRef = useRef<number>(containerHeight);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      container.style.opacity = "1";
    }
  }, []);

  const scrollHandler = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scrollSize = container.scrollHeight - container.scrollTop;

    if (onScroll) {
      onScroll(scrollSize);
    }
  }, [onScroll]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (containerHeightRef.current !== containerHeight) {
      const sizeDiff = containerHeight - containerHeightRef.current;

      container.scrollTop = container.scrollTop + sizeDiff;

      containerHeightRef.current = containerHeight;
    }
  }, [containerHeight]);

  return (
    <div
      className={cn(styles.container, className)}
      ref={containerRef}
      onScroll={scrollHandler}
    >
      <div className={styles.content} style={{ height: containerHeight }}>
        {children}
      </div>
    </div>
  );
}
