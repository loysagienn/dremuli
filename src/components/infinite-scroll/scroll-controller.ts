import { initAnimationController, AnimationController } from "utils/animation";

type ScrollControllerOptions = {
  scrollArea: HTMLDivElement;
  defaultValue?: number;
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

function isInertiaScrolling(lastDiffs: [number, number][]) {
  const diffsPerFrame = getDiffsPerFrame(lastDiffs);

  if (diffsPerFrame.length > 15) {
    const lastDiffs = diffsPerFrame.slice(-15);
    const totalDiff = Math.abs(lastDiffs[0] - lastDiffs[14]);

    let speedDownCount = 0;

    for (let i = 1; i < lastDiffs.length; i++) {
      const prev = Math.abs(lastDiffs[i - 1]);
      const curr = Math.abs(lastDiffs[i]);

      if (curr <= prev + 0.03) {
        speedDownCount += 1;
      }
    }

    return totalDiff < 8 && totalDiff > 1 && speedDownCount > 11;
  }

  return false;
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

  const reset = () => {
    lastDiffs.splice(0, lastDiffs.length);
  };

  return { lastDiffs, pushDiff, reset };
}

function predictFinalValue(currentValue: number, diffsPerFrame: number[]) {
  if (diffsPerFrame.length < 2) {
    return currentValue;
  }
  const lastDiffs = diffsPerFrame.slice(-10);

  let factor = 0;

  for (let i = 1; i < lastDiffs.length; i++) {
    factor += lastDiffs[i - 1] / lastDiffs[i];
  }

  const slowdownFactor = Math.max(factor / (lastDiffs.length - 1), 1.05);

  let diff = diffsPerFrame[diffsPerFrame.length - 1];

  let value = currentValue;

  while (Math.abs(diff) > 0.3) {
    value += diff;

    diff /= slowdownFactor;
  }

  return value;
}

export function initScrollController({
  scrollArea,
  defaultValue = 0,
  onChange,
  snapSize,
}: ScrollControllerOptions) {
  scrollArea.scrollTop = 5000;
  let currentScrollTop = 5000;
  let currentValue = defaultValue;
  let inertiaFactor = 0;
  let animationController: AnimationController | null = null;
  let touchesCount = 0;

  const diffController = initDiffController();

  const createAnimationController = () => {
    if (!animationController) {
      animationController = initAnimationController(currentValue, (value) => {
        currentValue = value;
        onChange(currentValue);
      });
    }
  };

  const destroyAnimationController = () => {
    if (animationController) {
      animationController.destroy();
      animationController = null;
    }
  };

  const snapValue = (isInertial: boolean) => {
    if (animationController || !snapSize) {
      return;
    }

    const diffsPerFrame = getDiffsPerFrame(diffController.lastDiffs);

    const targetValue = isInertial
      ? predictFinalValue(currentValue, diffsPerFrame)
      : currentValue;

    const diff = targetValue % snapSize;

    if (diff === 0) {
      return;
    }

    const snappedTargetValue =
      Math.abs(diff) < snapSize / 2
        ? targetValue - diff
        : targetValue + Math.sign(diff) * snapSize - diff;

    createAnimationController();

    const animationSpeed =
      diffsPerFrame.length > 0 ? diffsPerFrame[diffsPerFrame.length - 1] : 0;

    animationController.move(snappedTargetValue, snapSize / 20, animationSpeed);
  };

  const setValue = (value: number) => {
    if (value === currentValue) {
      return;
    }

    createAnimationController();

    animationController.move(value, (snapSize || 40) / 20);
  };

  const startUserScrolling = () => {
    destroyAnimationController();
  };

  const stopScrolling = () => {
    if (touchesCount > 0) {
      return;
    }

    snapValue(false);
    diffController.reset();
    inertiaFactor = 0;
  };

  let stopScrollingTimeout: NodeJS.Timeout | null = null;

  const requestStopScrolling = (timeout = 200) => {
    if (stopScrollingTimeout !== null) {
      clearTimeout(stopScrollingTimeout);
    }

    stopScrollingTimeout = setTimeout(stopScrolling, timeout);
  };

  const startInertiaScrolling = () => {
    if (animationController) {
      return;
    }

    snapValue(true);
  };

  const onScroll = () => {
    const { scrollTop, offsetHeight } = scrollArea;

    if (scrollTop === currentScrollTop) {
      return;
    }

    const diff = (scrollTop - currentScrollTop) * 1;

    const bottomSpace = 10000 - scrollTop - offsetHeight;

    if (scrollTop < 1000 || bottomSpace < 1000) {
      scrollArea.scrollTop = 5000;
    }

    currentScrollTop = scrollArea.scrollTop;

    diffController.pushDiff(diff);

    if (isInertiaScrolling(diffController.lastDiffs)) {
      inertiaFactor += 1;
    } else {
      inertiaFactor -= 1;
    }

    if (inertiaFactor > 10) {
      inertiaFactor = 10;
    } else if (inertiaFactor < 0) {
      inertiaFactor = 0;
    }

    if (inertiaFactor > 6 && touchesCount === 0) {
      startInertiaScrolling();
    } else {
      startUserScrolling();
    }

    if (!animationController) {
      currentValue += diff;
      onChange(currentValue);
    }

    requestStopScrolling();
  };

  const onTouchStart = (event: TouchEvent) => {
    touchesCount = event.touches.length;
  };

  const onTouchEnd = (event: TouchEvent) => {
    touchesCount = event.touches.length;

    requestStopScrolling(60);
  };

  window.addEventListener("touchstart", onTouchStart);
  window.addEventListener("touchend", onTouchEnd);

  scrollArea.addEventListener("scroll", onScroll);

  const destroy = () => {
    scrollArea.removeEventListener("scroll", onScroll);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);

    destroyAnimationController();
  };

  return { destroy, setValue };
}

export type ScrollController = ReturnType<typeof initScrollController>;
