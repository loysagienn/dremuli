import { computedQuant, MutableQuant, Quant, quant } from "utils/quant";
import { SCROLL_OFFSET } from "./constants";
import { ScrollDirection } from "./types";
import { trackDivSize } from "utils/div-size";
import { Size } from "types";
import { debounce } from "utils/debounce";

function setStyles(
  containerNode: HTMLDivElement,
  scrollNode: HTMLDivElement,
  $scrollPixelValue: MutableQuant<number>,
  $containerSize: MutableQuant<Size>,
  direction: ScrollDirection
) {
  if (direction === "vertical") {
    containerNode.scrollTop = $scrollPixelValue.get();

    return $containerSize.subscribe((size) => {
      scrollNode.style.width = `${size.width}px`;
    });
  }

  containerNode.scrollLeft = $scrollPixelValue.get();

  return $containerSize.subscribe((size) => {
    scrollNode.style.height = `${size.height}px`;
  });
}

export function initScrollManager(
  containerNode: HTMLDivElement,
  scrollNode: HTMLDivElement,
  $scrollPixelValue: MutableQuant<number>,
  $minMaxRange: Quant<[number, number]>,
  $containerLength: MutableQuant<number>,
  $scrollableLength: Quant<number>,
  shiftScrollStartValue: (pixelDiff: number) => void,
  valuePosition: number,
  direction: ScrollDirection
) {
  const setScrollableLength = (length: number) => {
    if (direction === "vertical") {
      scrollNode.style.height = `${length}px`;
    } else {
      scrollNode.style.width = `${length}px`;
    }
  };

  $scrollableLength.subscribe(setScrollableLength);

  const { destroy: destroySizeTracker, $size: $containerSize } =
    trackDivSize(containerNode);

  const destroyStyles = setStyles(
    containerNode,
    scrollNode,
    $scrollPixelValue,
    $containerSize,
    direction
  );

  let aaa = true;

  const unsubscribeContainerSize = $containerSize.subscribe((containerSize) => {
    const length =
      direction === "vertical" ? containerSize.height : containerSize.width;

    const containerLength = $containerLength.get();

    if (length !== containerLength) {
      if (aaa) {
        shiftScrollStartValue((containerLength - length) * valuePosition);
        aaa = false;
      }
      // shiftScrollStartValue((containerLength - length) * valuePosition);
      $containerLength.set(length);
    }
  });

  const recenterScroll = () => {
    const containerLength = $containerLength.get();
    const containerTopPixelValue = $scrollPixelValue.get();
    const containerBottomPixelValue = containerTopPixelValue + containerLength;
    const scrollStartPixelValue = 0;
    const scrollEndPixelValue = SCROLL_OFFSET * 2;
    const [minPixelValue, maxPixelValue] = $minMaxRange.get();
    const topSpace = containerTopPixelValue - scrollStartPixelValue;
    const bottomSpace = scrollEndPixelValue - containerBottomPixelValue;

    const setScrollPosition = (
      scrollPosition: number,
      scrollStartValueShift: number
    ) => {
      $scrollPixelValue.set(scrollPosition);

      shiftScrollStartValue(scrollStartValueShift);

      if (direction === "vertical") {
        containerNode.scrollTop = scrollPosition;
      } else {
        containerNode.scrollLeft = scrollPosition;
      }
    };

    const setScrollToCetner = () => {
      const newScrollPosition = SCROLL_OFFSET - Math.round(containerLength / 2);

      setScrollPosition(
        newScrollPosition,
        containerTopPixelValue - newScrollPosition
      );
    };

    if (maxPixelValue === null && minPixelValue === null) {
      if (topSpace < 2000 || bottomSpace < 2000) {
        setScrollToCetner();
      }

      return;
    }

    const handleTopLimit = () => {
      if (minPixelValue > containerTopPixelValue) {
        const newScrollPosition = 0;

        setScrollPosition(newScrollPosition, minPixelValue);

        return true;
      }

      if (minPixelValue > scrollStartPixelValue) {
        const outOfRangeDiff = scrollStartPixelValue - minPixelValue;
        const newScrollPosition = containerTopPixelValue + outOfRangeDiff;

        setScrollPosition(newScrollPosition, -outOfRangeDiff);

        return true;
      }

      if (minPixelValue < scrollStartPixelValue) {
        if (topSpace < 2000) {
          setScrollToCetner();

          return true;
        }
      }

      return false;
    };

    const handleBottomLimit = () => {
      if (maxPixelValue < containerBottomPixelValue) {
        const outOfRangeDiff = containerBottomPixelValue - maxPixelValue;
        const newScrollPosition = SCROLL_OFFSET * 2 - containerLength;
        const scrollShift =
          containerTopPixelValue - newScrollPosition - outOfRangeDiff;

        setScrollPosition(newScrollPosition, scrollShift);

        return true;
      }

      if (maxPixelValue < scrollEndPixelValue) {
        const outOfRangeDiff = scrollEndPixelValue - maxPixelValue;
        const newScrollPosition = containerTopPixelValue + outOfRangeDiff;

        setScrollPosition(newScrollPosition, -outOfRangeDiff);

        return true;
      }

      if (maxPixelValue > scrollEndPixelValue) {
        if (bottomSpace < 2000) {
          setScrollToCetner();

          return true;
        }
      }

      return false;
    };

    if (maxPixelValue !== null && minPixelValue !== null) {
      const valueDiff = maxPixelValue - minPixelValue;

      if (valueDiff > SCROLL_OFFSET * 2) {
        handleTopLimit() || handleBottomLimit();
      } else {
        if (minPixelValue !== scrollStartPixelValue) {
          const outOfRangeDiff = scrollStartPixelValue - minPixelValue;
          const newScrollPosition = containerTopPixelValue + outOfRangeDiff;

          setScrollPosition(newScrollPosition, -outOfRangeDiff);
        }

        return;
      }

      return;
    }

    if (minPixelValue !== null && maxPixelValue === null) {
      if (bottomSpace < 2000) {
        setScrollToCetner();

        return;
      }

      handleTopLimit();

      return;
    }

    if (minPixelValue === null && maxPixelValue !== null) {
      if (topSpace < 2000) {
        setScrollToCetner();

        return;
      }

      handleBottomLimit();

      return;
    }
  };

  recenterScroll();

  const onScroll = () => {
    const scrollValue =
      direction === "vertical"
        ? containerNode.scrollTop
        : containerNode.scrollLeft;

    const scrollPixelValue = $scrollPixelValue.get();

    if (scrollPixelValue === scrollValue) {
      return;
    }

    $scrollPixelValue.set(scrollValue);
    recenterScroll();
  };

  const unsubscribeMinMaxRange = $minMaxRange.listen(recenterScroll);

  containerNode.addEventListener("scroll", onScroll);

  const destroy = () => {
    unsubscribeMinMaxRange();
    containerNode.removeEventListener("scroll", onScroll);
    destroyStyles();
    unsubscribeContainerSize();
    destroySizeTracker();
  };

  return { $containerSize, destroy };
}

export type ScrollManager = ReturnType<typeof initScrollManager>;
