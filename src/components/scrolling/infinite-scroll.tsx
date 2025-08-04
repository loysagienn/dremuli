import React, { memo, ReactNode, useLayoutEffect, useRef } from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";
import { InfiniteScrollController } from "./scroll-controller";

type InfiniteScrollProps = {
  scrollController: InfiniteScrollController;
  className?: string;
  children: ReactNode;
};

function InfiniteScroll({
  scrollController,
  className,
  children,
}: InfiniteScrollProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;
    const scrollableNode = scrollableRef.current;

    if (scrollArea && scrollableNode) {
      scrollController.init(scrollArea, scrollableNode);

      return () => {
        scrollController.destroy();
      };
    }
  }, [scrollController]);

  return (
    <div
      className={cn(
        className,
        styles.container,
        styles[scrollController.direction],
        scrollController.snapSize && styles.snapValue
      )}
    >
      <div className={styles.scrollArea} ref={scrollAreaRef}>
        <div className={styles.scrollable} ref={scrollableRef}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const EnhancedInfiniteScroll = memo(InfiniteScroll);

export { EnhancedInfiniteScroll as InfiniteScroll };
