import { atom, Atom, WritableAtom } from "nanostores";
import { ScrollManager } from "./scroll-manager";
import { addWindowEvent, removeWindowEvent } from "utils/browser";

export function initScaling(
  $value: Atom<number>,
  $scale: WritableAtom<number>,
  setValue: (value: number) => void,
  scrollManager: ScrollManager,
  direction: "vertical" | "horizontal",
  scalingEnabled: boolean,
  valuePositionFactor: number
) {
  if (!scalingEnabled) {
    return {
      destroy: () => {},
    };
  }

  const onWheel = (event: WheelEvent) => {
    if (scrollManager.$scrolling.get()) {
      return;
    }

    const [delta, deltaOpposite] =
      direction === "vertical"
        ? [event.deltaX, event.deltaY]
        : [event.deltaY, event.deltaX];

    if (Math.abs(deltaOpposite) > Math.abs(delta) / 2) {
      return;
    }

    let scaleFactor = 1 + Math.abs(delta) / 500;
    if (delta < 0) {
      scaleFactor = 1 / scaleFactor;
    }

    const scale = $scale.get();
    const newScale = scale * scaleFactor;

    const scrollAreaNode = scrollManager.$scrollAreaNode.get();
    const rect = scrollAreaNode.getBoundingClientRect();
    const value = $value.get();
    const valueDiffPixel =
      direction === "horizontal"
        ? rect.left +
          (rect.right - rect.left) * valuePositionFactor -
          event.clientX
        : rect.top +
          (rect.bottom - rect.top) * valuePositionFactor -
          event.clientY;
    const mouseValue = value - valueDiffPixel * scale;
    const newValue = mouseValue + valueDiffPixel * newScale;

    setValue(newValue);

    // console.log("scale change");

    $scale.set(scale * scaleFactor);
  };

  addWindowEvent("wheel", onWheel);

  const destroy = () => {
    removeWindowEvent("wheel", onWheel);
  };

  return {
    destroy,
  };
}
