import { computedQuant, quant } from "utils/quant";
import { SCROLL_OFFSET } from "./constants";
import { ScrollDirection } from "./types";
import { initScrollManager, ScrollManager } from "./scroll-manager";

type ScrollControllerOptions = {
  defaultValue: number;
  valuePosition: number;
  direction: ScrollDirection;
  defaultScale: number;
  scalingEnabled: boolean;
  containerLength?: number;
};

const DEFAULT_CONTAINER_LENGTH = 100;

export function createScrollController({
  defaultValue,
  valuePosition,
  direction,
  defaultScale,
  containerLength = DEFAULT_CONTAINER_LENGTH,
}: ScrollControllerOptions) {
  const $scrollPixelValue = quant(SCROLL_OFFSET);
  const $scale = quant(defaultScale);
  const $containerLength = quant(containerLength);
  const $scrollStartValue = quant(
    defaultValue -
      (SCROLL_OFFSET + containerLength * valuePosition) * defaultScale
  );
  const $inited = quant(false);

  const $visibleRangeValue = computedQuant(
    [$scrollPixelValue, $scrollStartValue, $containerLength, $scale],
    (scrollPixelValue, scrollStartValue, containerLength, scale) => {
      const startValue = scrollStartValue + scrollPixelValue * scale;
      const endValue =
        scrollStartValue + (scrollPixelValue + containerLength) * scale;

      return [startValue, endValue] as [number, number];
    }
  );

  const $value = computedQuant(
    [$visibleRangeValue],
    ([startValue, endValue]) =>
      startValue + (endValue - startValue) * valuePosition
  );

  const shiftScrollStartValue = (pixelDiff: number) => {
    const scrollStartValue = $scrollStartValue.get();
    const scale = $scale.get();

    $scrollStartValue.set(scrollStartValue + pixelDiff * scale);
  };

  let scrollManager: ScrollManager | null = null;

  const init = (containerNode: HTMLDivElement, scrollNode: HTMLDivElement) => {
    if (scrollManager) {
      scrollManager.destroy();
    }

    scrollManager = initScrollManager(
      containerNode,
      scrollNode,
      $scrollPixelValue,
      $containerLength,
      shiftScrollStartValue,
      valuePosition,
      direction
    );

    $inited.set(true);
  };

  const destroy = () => {
    $value.destroy();
    $visibleRangeValue.destroy();

    if (scrollManager) {
      scrollManager.destroy();
    }
  };

  return {
    $value,
    $visibleRangeValue,
    $scrollStartValue,
    $scale,
    $inited,
    valuePosition,
    direction,
    init,
    destroy,
  };
}

export type ScrollController = ReturnType<typeof createScrollController>;
