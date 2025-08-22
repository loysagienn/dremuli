import { addWindowEvent } from "./browser";
import { quant } from "./quant";

export type DivPosition = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function positionChanged(from: DivPosition, to: DivPosition) {
  return (
    from.left !== to.left ||
    from.right !== to.right ||
    from.top !== to.top ||
    from.bottom !== to.bottom
  );
}

export function trackDivPosition(div: HTMLElement) {
  const $position = quant(div.getBoundingClientRect());

  const updatePosition = () => {
    const position = $position.get();
    const newPosition = div.getBoundingClientRect();

    if (positionChanged(position, newPosition)) {
      $position.set(newPosition);
    }
  };

  const removeScrollEvent = addWindowEvent("scroll", updatePosition, true);
  const removeResizeEvent = addWindowEvent("resize", updatePosition, true);

  const destroy = () => {
    removeScrollEvent();
    removeResizeEvent();
    $position.destroy();
  };

  return {
    $position,
    destroy,
  };
}
