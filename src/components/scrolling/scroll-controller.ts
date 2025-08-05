import { Atom, atom } from "nanostores";
import { initAnimationController } from "utils/animation";
import { initScrollManager } from "./scroll-manager";
import { initSnapping } from "./snapping";
import { debounce } from "utils/debounce";
import { initScaling } from "./scaling";

type InfiniteScrollControllerOptions = {
  direction: "horizontal" | "vertical";
  defaultValue?: number;
  scale?: number;
  snapSize?: number;
  minValue?: number | null;
  maxValue?: number | null;
  scalingEnabled?: boolean;
  valuePositionFactor?: number;
};

const defaultOptions: InfiniteScrollControllerOptions = {
  direction: "vertical",
};

function initValue(
  defaultValue: number,
  minValue: number | null,
  maxValue: number | null
): [Atom<number>, (value: number) => void] {
  const $value = atom(defaultValue);

  const setValue = (value: number) => {
    if (minValue !== null && value < minValue) {
      $value.set(minValue);
    } else if (maxValue !== null && value > maxValue) {
      $value.set(maxValue);
    } else {
      $value.set(value);
    }
  };

  return [$value, setValue];
}

export function initInfiniteScrollController({
  direction = "vertical",
  defaultValue,
  scale = 1,
  snapSize,
  minValue = null,
  maxValue = null,
  scalingEnabled,
  valuePositionFactor,
}: InfiniteScrollControllerOptions = defaultOptions) {
  const $scale = atom(scale);
  const [$value, setValue] = initValue(defaultValue | 0, minValue, maxValue);

  const onScroll = (diff: number) => {
    const scale = $scale.get();
    const newValue = $value.get() + diff * scale;

    setValue(newValue);

    const value = $value.get();

    if (value !== newValue) {
      updateSnapElementsDebounced();
    }
  };

  const onRecenter = () => {
    updateSnapElements();
  };

  const scrollManager = initScrollManager({
    direction,
    onRecenter,
    onScroll,
    recenterOnScroll: !snapSize,
  });

  const scaling = initScaling(
    $value,
    $scale,
    setValue,
    scrollManager,
    direction,
    scalingEnabled,
    valuePositionFactor ?? 1
  );

  let updateValueAnimationReset: (() => void) | null = null;

  const updateValue = (value: number) => {
    if (scrollManager.$scrolling.get() || $value.get() === value) {
      return;
    }

    if (updateValueAnimationReset) {
      updateValueAnimationReset();
    }

    updateValueAnimationReset = () => {
      animationController.destroy();
      unsubscribeScrolling();
      updateSnapElements();
      updateValueAnimationReset = null;
    };

    const animationController = initAnimationController(
      $value.get(),
      setValue,
      updateValueAnimationReset
    );

    const unsubscribeScrolling = scrollManager.$scrolling.listen(
      (scrolling) => {
        if (scrolling) {
          updateValueAnimationReset();
        }
      }
    );

    const scale = $scale.get();

    const distanceFactor = snapSize ? (snapSize * scale) / 10 : scale;

    animationController.move(value, distanceFactor);
  };

  const [updateSnapElements] = initSnapping(
    scrollManager,
    snapSize,
    direction,
    $value,
    $scale,
    updateValue
  );

  const updateSnapElementsDebounced = debounce(updateSnapElements, 100);

  const init = (
    scrollAreaNode: HTMLDivElement,
    scrollableNode: HTMLDivElement
  ) => {
    scrollManager.setNodes(scrollAreaNode, scrollableNode);

    updateSnapElements();
  };

  const destroy = () => {
    scrollManager.destroy();
    scaling.destroy();
  };

  return {
    init,
    destroy,
    updateValue,
    direction,
    snapSize,
    minValue,
    maxValue,
    $value,
    $scale,
    $containerSize: scrollManager.$containerSize,
    scalingEnabled: scalingEnabled ?? false,
  };
}

export type InfiniteScrollController = ReturnType<
  typeof initInfiniteScrollController
>;
