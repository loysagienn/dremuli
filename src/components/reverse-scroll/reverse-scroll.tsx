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
  const contentRef = useRef<HTMLDivElement>(null);
  const containerHeightRef = useRef<number>(10000);

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
    const content = contentRef.current;

    if (!container || !content) {
      return;
    }

    if (containerHeightRef.current !== containerHeight) {
      const sizeDiff = containerHeight - containerHeightRef.current;
      const newScrollTop = container.scrollTop + sizeDiff;

      content.style.height = `${containerHeight}px`;
      container.scrollTop = newScrollTop;

      containerHeightRef.current = containerHeight;
    }
  }, [containerHeight]);

  return (
    <div
      className={cn(styles.container, className)}
      ref={containerRef}
      onScroll={scrollHandler}
    >
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
