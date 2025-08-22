import { addWindowEvent } from "./browser";
import { quant } from "./quant";

export type DivPosition = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  windowWidth: number;
  windowHeight: number;
};

function positionChanged(from: DivPosition, to: DivPosition) {
  return (
    from.left !== to.left ||
    from.right !== to.right ||
    from.top !== to.top ||
    from.bottom !== to.bottom ||
    from.windowWidth !== to.windowWidth ||
    from.windowHeight !== to.windowHeight
  );
}

function getPosition(div: HTMLElement): DivPosition {
  const { left, right, top, bottom } = div.getBoundingClientRect();

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return { left, right, top, bottom, windowWidth, windowHeight };
}

export function trackDivPosition(div: HTMLElement) {
  const $position = quant<DivPosition>(getPosition(div));

  const updatePosition = () => {
    const position = $position.get();
    const newPosition = getPosition(div);

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
