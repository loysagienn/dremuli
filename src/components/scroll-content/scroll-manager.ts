import { computedQuant, MutableQuant, Quant, quant } from "utils/quant";
import { SCROLL_OFFSET } from "./constants";
import { ScrollDirection } from "./types";
import { trackDivSize } from "utils/div-size";
import { Size } from "types";

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
  $containerLength: MutableQuant<number>,
  shiftScrollStartValue: (pixelDiff: number) => void,
  valuePosition: number,
  direction: ScrollDirection
) {
  const { destroy: destroySizeTracker, $size: $containerSize } =
    trackDivSize(containerNode);

  const destroyStyles = setStyles(
    containerNode,
    scrollNode,
    $scrollPixelValue,
    $containerSize,
    direction
  );

  const unsubscribeContainerSize = $containerSize.subscribe((containerSize) => {
    const length =
      direction === "vertical" ? containerSize.height : containerSize.width;

    const containerLength = $containerLength.get();

    if (length !== containerLength) {
      shiftScrollStartValue((containerLength - length) * valuePosition);

      $containerLength.set(length);
    }
  });

  const recenterScroll = () => {
    const scrollPixelValue = $scrollPixelValue.get();
    const containerLength = $containerLength.get();
    const bottomSpace = SCROLL_OFFSET * 2 - scrollPixelValue - containerLength;

    if (scrollPixelValue < 2000 || bottomSpace < 2000) {
      $scrollPixelValue.set(SCROLL_OFFSET);

      shiftScrollStartValue(scrollPixelValue - SCROLL_OFFSET);

      if (direction === "vertical") {
        containerNode.scrollTop = SCROLL_OFFSET;
      } else {
        containerNode.scrollLeft = SCROLL_OFFSET;
      }
    }
  };

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

  containerNode.addEventListener("scroll", onScroll);

  const destroy = () => {
    containerNode.removeEventListener("scroll", onScroll);
    destroyStyles();
    unsubscribeContainerSize();
    destroySizeTracker();
  };

  return { destroy };
}

export type ScrollManager = ReturnType<typeof initScrollManager>;
