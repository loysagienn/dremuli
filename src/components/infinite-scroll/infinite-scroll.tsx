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
  const inertiaFactor = useRef(0);

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
    const diffOfDiffs: number[] = [];

    for (let i = 1; i < diffsPerFrame.length; i++) {
      diffOfDiffs.push(
        Math.abs(diffsPerFrame[i] - diffsPerFrame[i - 1]) -
          Math.abs(diffsPerFrame[i]) / 15
      );
    }

    if (frameDiffRef.current) {
      let diffshtml = "";
      if (diffsPerFrame.length > 15) {
        const last10diffs = diffsPerFrame.slice(-15);
        const totalDiff = Math.abs(last10diffs[0] - last10diffs[14]);
        diffshtml += `<br/>${totalDiff}`;

        let speedDownCount = 0;

        for (let i = 1; i < last10diffs.length; i++) {
          const prev = Math.abs(last10diffs[i - 1]);
          const curr = Math.abs(last10diffs[i]);

          if (curr <= prev + 0.03) {
            speedDownCount += 1;
          }
        }
        diffshtml += `<br/>${speedDownCount}`;

        if (totalDiff < 20 && totalDiff > 1 && speedDownCount > 11) {
          inertiaFactor.current += 1;
        } else {
          inertiaFactor.current -= 1;
        }

        if (inertiaFactor.current > 10) {
          inertiaFactor.current = 10;
        } else if (inertiaFactor.current < 0) {
          inertiaFactor.current = 0;
        }

        diffshtml += `<br/>${inertiaFactor.current}`;

        if (inertiaFactor.current > 6) {
          diffshtml += `<br/>+++++++`;
        } else {
          diffshtml += `<br/>-------`;
        }
      }
      frameDiffRef.current.innerHTML = diffshtml;
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
