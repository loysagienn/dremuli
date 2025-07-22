import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  snapSize?: number;
};

function getDiffsPerFrame(lastDiffs: [number, number][]) {
  const diffPerFrame: number[] = [];

  for (let i = 1; i < lastDiffs.length; i++) {
    const [prev] = lastDiffs[i - 1];
    const [curr, diff] = lastDiffs[i];

    const time = curr - prev;

    diffPerFrame.push(diff);
  }

  return diffPerFrame;
}

function initDiffController() {
  const lastDiffs: [number, number][] = [];

  const pushDiff = (diff: number) => {
    lastDiffs.push([performance.now(), Math.round(diff)]);

    if (lastDiffs.length > 121) {
      lastDiffs.shift();
    }
  };

  return { lastDiffs, pushDiff };
}

export function InfiniteScroll({
  min,
  max,
  defaultValue,
  className,
  children,
  onChange,
  snapSize,
}: InfiniteScrollProps) {
  const diffController = useMemo(initDiffController, []);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const frameDiffRef = useRef<HTMLDivElement>(null);
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

    diffController.pushDiff(diff);

    const diffPerFrame = getDiffsPerFrame(diffController.lastDiffs);

    if (frameDiffRef.current) {
      frameDiffRef.current.innerHTML = diffPerFrame.join(" ");
      frameDiffRef.current.style.fontSize = `12px`;
    }
  }, [onChange]);

  return (
    <div className={cn(className, styles.container)}>
      <div
        className={styles.scrollArea}
        ref={scrollAreaRef}
        onScroll={onScroll}
      >
        <div className={styles.scrollable} />
        <div className={styles.content}>
          {children}
          <div ref={frameDiffRef} />
        </div>
      </div>
    </div>
  );
}
