import React, {
  memo,
  ReactNode,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";
import { usePersistentCallback } from "utils/hooks";
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

  const [hasMounted, setHasMounted] = useState(false);

  const [scrollController, setScrollController] =
    useState<ScrollController | null>(null);

  const changeHandler = usePersistentCallback(onChange);

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const scrollController = initScrollController({
        scrollArea,
        defaultValue,
        snapSize,
        onChange: changeHandler,
        min,
        max,
      });

      setScrollController(scrollController);

      return () => {
        scrollController.destroy();
      };
    }
  }, [snapSize]);

  useLayoutEffect(() => {
    if (scrollController && externalValue !== null) {
      scrollController.setValue(externalValue);
    }
  }, [externalValue]);

  // client-side rendering only
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      scrollArea.style.opacity = "1";
    }

    setHasMounted(true);
  }, []);

  return (
    <div className={cn(className, styles.container)}>
      <div className={styles.scrollArea} ref={scrollAreaRef}>
        <div className={styles.scrollable}></div>
        <div className={styles.content}>{hasMounted ? children : 0}</div>
      </div>
    </div>
  );
}

const EnhancedInfiniteScroll = memo(InfiniteScroll);

export { EnhancedInfiniteScroll as InfiniteScroll };
