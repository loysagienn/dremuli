import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";

type InfiniteScrollProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  className?: string;
  children: ReactNode;
  onChange: (value: number) => void;
};

export function InfiniteScroll({
  min,
  max,
  defaultValue,
  className,
  children,
  onChange,
}: InfiniteScrollProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(defaultValue || 0);
  const scrollTopRef = useRef(5000);

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (!scrollArea) {
      return;
    }

    scrollArea.scrollTop = 5000;
  }, []);

  const onScroll = useCallback(() => {
    const scrollArea = scrollAreaRef.current;

    if (!scrollArea || scrollArea.scrollTop === scrollTopRef.current) {
      return;
    }

    const diff = scrollArea.scrollTop - scrollTopRef.current;

    valueRef.current += diff;

    onChange(valueRef.current);

    const bottomSpace = 10000 - scrollArea.scrollTop - scrollArea.offsetHeight;

    if (scrollArea.scrollTop < 1000 || bottomSpace < 1000) {
      scrollArea.scrollTop = 5000;
    }

    scrollTopRef.current = scrollArea.scrollTop;
  }, [onChange]);

  return (
    <div className={cn(className, styles.container)}>
      <div
        className={styles.scrollArea}
        ref={scrollAreaRef}
        onScroll={onScroll}
      >
        <div className={styles.scrollable} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
