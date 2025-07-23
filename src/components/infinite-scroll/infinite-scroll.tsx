import React, {
  memo,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";
import { initScrollController, ScrollController } from "./scroll-controller";

type InfiniteScrollProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  externalValue?: number;
  className?: string;
  children: ReactNode;
  onChange: (value: number) => void;
  snapSize?: number;
};

function InfiniteScroll({
  min,
  max,
  defaultValue,
  externalValue = null,
  className,
  children,
  onChange,
  snapSize,
}: InfiniteScrollProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollController, setScrollController] =
    useState<ScrollController | null>(null);

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const scrollController = initScrollController({
        scrollArea,
        defaultValue,
        snapSize,
        onChange,
      });

      setScrollController(scrollController);

      return () => {
        scrollController.destroy();
      };
    }
  }, [onChange, snapSize]);

  useLayoutEffect(() => {
    if (scrollController && externalValue !== null) {
      scrollController.setValue(externalValue);
    }
  }, [externalValue]);

  return (
    <div className={cn(className, styles.container)}>
      <div className={styles.scrollArea} ref={scrollAreaRef}>
        <div className={styles.scrollable}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const EnhancedInfiniteScroll = memo(InfiniteScroll);

export { EnhancedInfiniteScroll as InfiniteScroll };
