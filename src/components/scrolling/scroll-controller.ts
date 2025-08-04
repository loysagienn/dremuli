import { Atom, atom } from "nanostores";
import { initAnimationController } from "utils/animation";
import { initScrollManager } from "./scroll-manager";
import { initSnapping } from "./snapping";
import { debounce } from "utils/debounce";

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
  snapSize,
  minValue = null,
  maxValue = null,
}: InfiniteScrollControllerOptions = defaultOptions) {
  const [$value, setValue] = initValue(defaultValue | 0, minValue, maxValue);

  const onScroll = (diff: number) => {
    const newValue = $value.get() + diff;

    setValue(newValue);

    const value = $value.get();

    if (value !== newValue) {
      updateSnapElementsDebounced();
    }

    // console.log(value === newValue);
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

  const [updateSnapElements] = initSnapping(
    scrollManager,
    snapSize,
    direction,
    $value
  );

  const updateSnapElementsDebounced = debounce(updateSnapElements, 100);

  const init = (
    scrollAreaNode: HTMLDivElement,
    scrollableNode: HTMLDivElement
  ) => {
    scrollManager.setNodes(scrollAreaNode, scrollableNode);

    updateSnapElements();
  };

  const updateValue = (value: number) => {
    if (scrollManager.$scrolling.get() || $value.get() === value) {
      return;
    }

    const reset = () => {
      animationController.destroy();
      unsubscribeScrolling();
    };

    const animationController = initAnimationController(
      $value.get(),
      setValue,
      reset
    );

    const unsubscribeScrolling = scrollManager.$scrolling.listen(
      (scrolling) => {
        if (scrolling) {
          reset();
        }
      }
    );

    animationController.move(value, snapSize ? snapSize / 5 : 20);
  };

  const destroy = () => {
    scrollManager.destroy();
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
    $containerSize: scrollManager.$containerSize,
  };
}

export type InfiniteScrollController = ReturnType<
  typeof initInfiniteScrollController
>;
