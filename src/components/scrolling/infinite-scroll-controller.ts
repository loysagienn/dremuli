import { Atom, atom } from "nanostores";
import { initAnimationController, AnimationController } from "utils/animation";
import { addWindowEvent, removeWindowEvent } from "utils/window-events";
import styles from "./infinite-scroll.module.css";

const scrollableSize = 20000;

type InfiniteScrollControllerOptions = {
  direction: "horizontal" | "vertical";
  defaultValue?: number;
  snapSize?: number;
  minValue?: number | null;
  maxValue?: number | null;
};

const defaultOptions: InfiniteScrollControllerOptions = {
  direction: "vertical",
};

function snapValue(
  $value: Atom<number>,
  $scrolling: Atom<boolean>,
  snapSize: number,
  setValue: (value: number) => void
) {
  let animationController: AnimationController | null = null;

  const getSnappedValue = () => {
    const value = $value.get();

    const diff = value % snapSize;

    const snappedValue =
      Math.abs(diff) < snapSize / 2
        ? value - diff
        : value + Math.sign(diff) * snapSize - diff;

    return snappedValue;
  };

  const createAnimationController = () => {
    if (!animationController) {
      const value = $value.get();

      animationController = initAnimationController(value, setValue);
    }
  };

  const destroyAnimationController = () => {
    if (animationController) {
      animationController.destroy();

      animationController = null;
    }
  };

  $scrolling.listen((scrolling) => {
    if (scrolling) {
      destroyAnimationController();
    } else {
      createAnimationController();

      const snappedValue = getSnappedValue();

      animationController.move(snappedValue, snapSize / 20);
    }
  });
}

function setSnapElements(
  scrollArea: HTMLDivElement,
  scrollableNode: HTMLDivElement,
  snapSize: number,
  value: number,
  scrollValue: number
) {
  // scrollArea.style.scrollSnapType = "";
  scrollableNode.innerHTML = "";

  const valueDiff = value % snapSize;
  const center = scrollValue - snapSize / 2 + scrollArea.offsetHeight / 2;
  let top = (center % snapSize) - valueDiff;

  while (top + snapSize < scrollableSize) {
    const node = document.createElement("div");
    node.classList.add(styles.snapTarget);
    node.style.top = `${top}px`;
    node.style.height = `${snapSize}px`;
    // node.style.backgroundColor = `rgba(${Math.round(
    //   (255 * top) / scrollableSize
    // )}, 0, 0, 0.5)`;

    scrollableNode.appendChild(node);

    top += snapSize;
  }

  // scrollArea.style.scrollSnapType = "y mandatory";
}

export function initInfiniteScrollController({
  direction = "vertical",
  defaultValue,
  snapSize,
  minValue = null,
  maxValue = null,
}: InfiniteScrollControllerOptions = defaultOptions) {
  const $value = atom(defaultValue || 0);
  const $scrollValue = atom(scrollableSize / 2);
  const $touchesCount = atom(0);
  const $scrolling = atom(false);

  let scrollArea: HTMLDivElement | null = null;
  let scrollableNode: HTMLDivElement | null = null;

  const setValue = (value: number) => {
    if (minValue !== null && value < minValue) {
      $value.set(minValue);
    } else if (maxValue !== null && value > maxValue) {
      $value.set(maxValue);
    } else {
      $value.set(value);
    }
  };

  // if (snapSize) {
  //   snapValue($value, $scrolling, snapSize, setValue);
  // }

  const getScrollPosition = (): [number, number] => {
    if (!scrollArea) {
      return [0, 0];
    }

    const { scrollTop, offsetHeight, scrollLeft, offsetWidth } = scrollArea;

    if (direction === "vertical") {
      return [scrollTop, offsetHeight];
    }

    return [scrollLeft, offsetWidth];
  };

  const setScrollPosition = (scrollValue: number) => {
    if (scrollArea) {
      if (direction === "vertical") {
        scrollArea.scrollTop = scrollValue;
      } else {
        scrollArea.scrollLeft = scrollValue;
      }
    }
  };

  const stopScrolling = () => {
    $scrolling.set(false);
  };

  let stopScrollingTimeout: NodeJS.Timeout | null = null;

  const requestStopScrolling = (timeout = 200) => {
    if (stopScrollingTimeout !== null) {
      clearTimeout(stopScrollingTimeout);
    }

    const touchesCount = $touchesCount.get();

    if (touchesCount > 0) {
      return;
    }

    stopScrollingTimeout = setTimeout(stopScrolling, timeout);
  };

  const onTouchStart = (event: TouchEvent) => {
    if (!scrollArea) {
      return;
    }

    $touchesCount.set(event.touches.length);
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!scrollArea) {
      return;
    }

    $touchesCount.set(event.touches.length);

    requestStopScrolling(60);
  };

  const recenterScroll = () => {
    const [scrollValue, elementSize] = getScrollPosition();

    const bottomSpace = scrollableSize - scrollValue - elementSize * 2;

    if (scrollValue < 3000 || bottomSpace < 3000) {
      scrollableNode.innerHTML = "";

      $scrollValue.set(scrollableSize / 2);
      setScrollPosition(scrollableSize / 2);

      if (snapSize) {
        setSnapElements(
          scrollArea,
          scrollableNode,
          snapSize,
          $value.get(),
          scrollableSize / 2
        );
      }
    }
  };

  $scrolling.listen((scrolling) => {
    if (!scrolling) {
      recenterScroll();
    }
  });

  const onScroll = () => {
    if (!scrollArea) {
      return;
    }

    const scrolling = $scrolling.get();

    if (!scrolling) {
      $scrolling.set(true);
    }

    const [scrollValue, elementSize] = getScrollPosition();

    const currentScrollValue = $scrollValue.get();

    if (currentScrollValue === scrollValue) {
      return;
    }

    const diff = scrollValue - currentScrollValue;

    setValue($value.get() + diff);

    $scrollValue.set(scrollValue);

    requestStopScrolling();
  };

  const init = (scrollAreaNode: HTMLDivElement, scrollable: HTMLDivElement) => {
    if (scrollArea) {
      scrollArea.removeEventListener("scroll", onScroll);
    }

    scrollArea = scrollAreaNode;
    scrollableNode = scrollable;

    $scrollValue.set(scrollableSize / 2);
    setScrollPosition(scrollableSize / 2);

    if (snapSize) {
      const value = $value.get();

      setSnapElements(
        scrollArea,
        scrollableNode,
        snapSize,
        value,
        scrollableSize / 2
      );
    }

    scrollArea.addEventListener("scroll", onScroll);
  };

  addWindowEvent("touchstart", onTouchStart);
  addWindowEvent("touchend", onTouchEnd);

  const destroy = () => {
    if (scrollArea) {
      scrollArea.removeEventListener("scroll", onScroll);
    }

    removeWindowEvent("touchstart", onTouchStart);
    removeWindowEvent("touchend", onTouchEnd);
  };

  return {
    init,
    destroy,
    direction,
    snapSize,
    $value,
  };
}

export type InfiniteScrollController = ReturnType<
  typeof initInfiniteScrollController
>;
