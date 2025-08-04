import { Atom, atom, WritableAtom } from "nanostores";
import { addWindowEvent, removeWindowEvent } from "utils/browser";
import { SCROLLABLE_SIZE } from "./constants";

type ScrollControllerRootOptions = {
  direction: "horizontal" | "vertical";
  onRecenter: () => void;
  onScroll: (diff: number) => void;
  recenterOnScroll: boolean;
};

function initTouch(
  $touchesCount: WritableAtom<number>,
  $scrollAreaNode: Atom<HTMLDivElement | null>,
  requestStopScrolling: (timeout: number) => void
): [() => void] {
  const onTouchStart = (event: TouchEvent) => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (!scrollAreaNode) {
      $touchesCount.set(0);

      return;
    }

    $touchesCount.set(event.touches.length);
  };

  const onTouchEnd = (event: TouchEvent) => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (!scrollAreaNode) {
      $touchesCount.set(0);

      return;
    }

    $touchesCount.set(event.touches.length);

    requestStopScrolling(60);
  };

  addWindowEvent("touchstart", onTouchStart);
  addWindowEvent("touchend", onTouchEnd);

  const destroy = () => {
    removeWindowEvent("touchstart", onTouchStart);
    removeWindowEvent("touchend", onTouchEnd);
  };

  return [destroy];
}

function initScrolling(
  $touchesCount: Atom<number>
): [Atom<boolean>, () => void, (timeout?: number) => void] {
  const $scrolling = atom(false);

  const startScrolling = () => {
    $scrolling.set(true);
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

  return [$scrolling, startScrolling, requestStopScrolling];
}

export function initScrollManager({
  direction = "vertical",
  onRecenter,
  onScroll,
  recenterOnScroll,
}: ScrollControllerRootOptions) {
  const $containerSize = atom(0);
  const $scrollValue = atom(SCROLLABLE_SIZE / 2);
  const $scrollAreaNode = atom<HTMLDivElement | null>(null);
  const $scrollableNode = atom<HTMLDivElement | null>(null);
  const $touchesCount = atom(0);

  const [$scrolling, startScrolling, requestStopScrolling] =
    initScrolling($touchesCount);

  const [destroyTouch] = initTouch(
    $touchesCount,
    $scrollAreaNode,
    requestStopScrolling
  );

  const getScrollPosition = (): [number, number] => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (!scrollAreaNode) {
      return [0, 0];
    }

    const { scrollTop, offsetHeight, scrollLeft, offsetWidth } = scrollAreaNode;

    if (direction === "vertical") {
      return [scrollTop, offsetHeight];
    }

    return [scrollLeft, offsetWidth];
  };

  const setScrollPosition = (scrollValue: number) => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (scrollAreaNode) {
      if (direction === "vertical") {
        scrollAreaNode.scrollTop = scrollValue;
      } else {
        scrollAreaNode.scrollLeft = scrollValue;
      }
    }
  };

  const recenterScroll = () => {
    const [scrollValue, elementSize] = getScrollPosition();

    const bottomSpace = SCROLLABLE_SIZE - scrollValue - elementSize * 2;

    if (scrollValue < 4000 || bottomSpace < 4000) {
      $scrollValue.set(SCROLLABLE_SIZE / 2);
      setScrollPosition(SCROLLABLE_SIZE / 2);
      onRecenter();
    }
  };

  $scrolling.listen((scrolling) => {
    if (!scrolling) {
      recenterScroll();
    }
  });

  const scrollHandler = () => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (!scrollAreaNode) {
      return;
    }

    const [scrollValue] = getScrollPosition();

    const currentScrollValue = $scrollValue.get();

    if (currentScrollValue === scrollValue) {
      return;
    }

    const scrolling = $scrolling.get();

    if (!scrolling) {
      startScrolling();
    }

    const diff = scrollValue - currentScrollValue;

    $scrollValue.set(scrollValue);

    requestStopScrolling();

    onScroll(diff);

    if (recenterOnScroll) {
      recenterScroll();
    }
  };

  const setNodes = (
    scrollAreaNode: HTMLDivElement,
    scrollableNode: HTMLDivElement
  ) => {
    const currentScrollAreaNode = $scrollAreaNode.get();

    if (currentScrollAreaNode) {
      currentScrollAreaNode.removeEventListener("scroll", scrollHandler);
    }

    $scrollAreaNode.set(scrollAreaNode);
    $scrollableNode.set(scrollableNode);

    $containerSize.set(
      direction === "vertical"
        ? scrollAreaNode.clientHeight
        : scrollAreaNode.clientWidth
    );
    $scrollValue.set(SCROLLABLE_SIZE / 2);
    setScrollPosition(SCROLLABLE_SIZE / 2);

    scrollAreaNode.addEventListener("scroll", scrollHandler);
  };

  const destroy = () => {
    const scrollAreaNode = $scrollAreaNode.get();

    if (scrollAreaNode) {
      scrollAreaNode.removeEventListener("scroll", scrollHandler);
    }

    destroyTouch();
  };

  return {
    $scrollAreaNode,
    $scrollableNode,
    $scrolling,
    setNodes,
    destroy,
    $containerSize,
    $scrollValue,
  };
}

export type ScrollManager = ReturnType<typeof initScrollManager>;
