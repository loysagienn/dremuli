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
  snappingEnabled?: boolean;
  snapSize?: number;
  containerLength?: number;
  minValue?: number;
  maxValue?: number;
};

const DEFAULT_CONTAINER_LENGTH = 100;

export function createScrollController({
  defaultValue,
  valuePosition,
  direction,
  defaultScale,
  scalingEnabled,
  snappingEnabled,
  snapSize = 100,
  containerLength = DEFAULT_CONTAINER_LENGTH,
  minValue,
  maxValue,
}: ScrollControllerOptions) {
  const $maxValue = quant<number | null>(maxValue ?? null);
  const $minValue = quant<number | null>(minValue ?? null);
  const $scrollPixelValue = quant(0);
  const $scale = quant(defaultScale);
  const $containerLength = quant(containerLength);
  const $containerSize = quant<DivSize>({ width: 100, height: 100 });
  const $scrollStartValue = quant(
    defaultValue - containerLength * valuePosition * defaultScale
  );
  const $inited = quant(false);

  const $minMaxRange = computedQuant(
    [$minValue, $maxValue, $scale, $scrollStartValue],
    (minValue, maxValue, scale, scrollStartValue) => {
      const minPixelValue =
        minValue === null ? null : (minValue - scrollStartValue) / scale;
      const maxPixelValue =
        maxValue === null ? null : (maxValue - scrollStartValue) / scale;

      return [minPixelValue, maxPixelValue] as [number | null, number | null];
    }
  );

  const $scrollableLength = computedQuant([$minMaxRange], ([min, max]) => {
    if (min === null || max === null) {
      return SCROLL_OFFSET * 2;
    }

    const diff = max - min;

    if (diff >= SCROLL_OFFSET * 2) {
      return SCROLL_OFFSET * 2;
    }

    return diff;
  });

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
      $minMaxRange,
      $containerLength,
      $scrollableLength,
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

  const setMinValue = (minValue: number | null) => $minValue.set(minValue);
  const setMaxValue = (maxValue: number | null) => $maxValue.set(maxValue);

  return {
    $containerSize,
    $scrollableLength,
    $value,
    $visibleRangeValue,
    $scrollStartValue,
    $scale,
    $inited,
    snapSize,
    valuePosition,
    direction,
    snappingEnabled,
    init,
    setMaxValue,
    setMinValue,
    destroy,
  };
}

export type ScrollController = ReturnType<typeof createScrollController>;
