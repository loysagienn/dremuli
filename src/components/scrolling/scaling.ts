import { atom, Atom } from "nanostores";
import { ScrollManager } from "./scroll-manager";
import { addWindowEvent, removeWindowEvent } from "utils/browser";

export function initScaling(
  $value: Atom<number>,
  setValue: (value: number) => void,
  scrollManager: ScrollManager,
  defaultScale: number,
  direction: "vertical" | "horizontal"
) {
  const $scale = atom(defaultScale);

  if (!defaultScale) {
    return {
      $scale,
      destroy: () => {},
    };
  }

  const onWheel = (event: WheelEvent) => {
    const [delta, deltaOpposite] =
      direction === "vertical"
        ? [event.deltaX, event.deltaY]
        : [event.deltaY, event.deltaX];

    if (Math.abs(deltaOpposite) > Math.abs(delta)) {
      return;
    }

    let scaleFactor = 1 + Math.abs(delta) / 500;
    if (delta < 0) {
      scaleFactor = 1 / scaleFactor;
    }

    const scrollAreaNode = scrollManager.$scrollAreaNode.get();
    const rect = scrollAreaNode.getBoundingClientRect();
    const value = $value.get();
    const right = rect.right - event.clientX;
    const valueDiff = right * scaleFactor - right;
    // console.log("value", value);
    // console.log("valueDiff", valueDiff);

    setValue(value / scaleFactor + valueDiff);

    // console.log("right", right);

    $scale.set($scale.get() * scaleFactor);
    // console.log("scaleFactor", scaleFactor);
  };

  addWindowEvent("wheel", onWheel);

  const destroy = () => {
    removeWindowEvent("wheel", onWheel);
  };

  return {
    $scale,
    destroy,
  };
}
