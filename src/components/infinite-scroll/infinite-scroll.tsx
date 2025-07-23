import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";
import { initScrollController } from "./scroll-controller";

type InfiniteScrollProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  className?: string;
  children: ReactNode;
  onChange: (value: number) => void;
  snapSize?: number;
};

function InfiniteScroll({
  min,
  max,
  defaultValue,
  className,
  children,
  onChange,
  snapSize,
}: InfiniteScrollProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const scrollController = initScrollController({
        scrollArea,
        defaultValue,
        snapSize,
        onChange,
      });

      return () => {
        scrollController.destroy();
      };
    }
  }, [onChange, snapSize]);

  return (
    <div className={cn(className, styles.container)}>
      <div className={styles.scrollArea} ref={scrollAreaRef}>
        <div className={styles.scrollable} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const EnhancedInfiniteScroll = memo(InfiniteScroll);

export { EnhancedInfiniteScroll as InfiniteScroll };
