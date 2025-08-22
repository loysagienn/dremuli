import { addWindowEvent } from "./browser";
import { quant } from "./quant";

export type DivSize = {
  width: number;
  height: number;
};

function sizeChanged(prev: DivSize, next: DivSize) {
  return prev.width !== next.width || prev.height !== next.height;
}

export function trackDivSize(div: HTMLElement) {
  const $size = quant<DivSize>({
    width: div.offsetWidth,
    height: div.offsetHeight,
  });

  const observer = new ResizeObserver((entires) => {
    const currentSize = $size.get();

    const newSize = {
      width: div.offsetWidth,
      height: div.offsetHeight,
    };

    if (sizeChanged(currentSize, newSize)) {
      $size.set(newSize);
    }
  });

  observer.observe(div);

  const destroy = () => {
    observer.disconnect();
    $size.destroy();
  };

  return {
    $size,
    destroy,
  };
}
