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
  const diffsPerFrame: number[] = [];

  for (let i = 4; i < lastDiffs.length; i++) {
    let totalTimeDiff = 0;
    let totalDiff = 0;
    for (let j = 0; j < 5; j++) {
      const [timeDiff, diff] = lastDiffs[i - j];

      totalTimeDiff += timeDiff;
      totalDiff += diff;
    }

    const diffPerMs = totalDiff / totalTimeDiff;

    const diffPerFrame = diffPerMs * 16.7;

    diffsPerFrame.push(diffPerFrame);
  }

  return diffsPerFrame;
}

function initDiffController() {
  const lastDiffs: [number, number][] = [];
  let time = performance.now();

  const pushDiff = (diff: number) => {
    const now = performance.now();

    const diffTime = now - time < 100 ? now - time : 16;
    time = now;
    lastDiffs.push([diffTime, diff]);

    if (lastDiffs.length > 71) {
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

    const diffsPerFrame = getDiffsPerFrame(diffController.lastDiffs);

    if (frameDiffRef.current) {
      frameDiffRef.current.innerHTML = diffsPerFrame
        .map((val) => val.toFixed(1))
        .join(" ");
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
