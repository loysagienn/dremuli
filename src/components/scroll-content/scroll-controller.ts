import { computedQuant, quant } from "utils/quant";
import { SCROLL_OFFSET } from "./constants";
import { ScrollDirection } from "./types";
import { initScrollManager, ScrollManager } from "./scroll-manager";
import { DivSize } from "utils/div-size";

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
  const $containerSize = quant<DivSize>({ width: 100, height: 100 });
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

  let destroyScrollManager: () => void = () => {};

  const init = (containerNode: HTMLDivElement, scrollNode: HTMLDivElement) => {
    destroyScrollManager();

    const scrollManager = initScrollManager(
      containerNode,
      scrollNode,
      $scrollPixelValue,
      $containerLength,
      shiftScrollStartValue,
      valuePosition,
      direction
    );

    const unsubscribe = scrollManager.$containerSize.subscribe((size) =>
      $containerSize.set(size)
    );

    destroyScrollManager = () => {
      scrollManager.destroy();
      unsubscribe();
    };

    $inited.set(true);
  };

  const destroy = () => {
    $value.destroy();
    $visibleRangeValue.destroy();

    destroyScrollManager();
  };

  return {
    $containerSize,
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
