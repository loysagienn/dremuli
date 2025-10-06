import { InfiniteScrollController } from "components/scrolling";
import { RefObject } from "react";
import { NapEvent } from "types";
import { addWindowEvent } from "utils/browser";
import { computedQuant, quant } from "utils/quant";

const HOUR_MS = 1000 * 60 * 60;
const DAY_MS = HOUR_MS * 24;

export function initMouseController(
  scrollController: InfiniteScrollController,
  width: number,
  height: number,
  headerHeight: number,
  containerRef: RefObject<HTMLDivElement>
) {
  const $mousePosition = quant<[number, number] | null>(null);
  const $activeNapEvent = quant<NapEvent | null>(null);
  const dataHeight = height - headerHeight;

  const onMouseMove = (event: MouseEvent) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();

    if (event.clientX < rect.left || event.clientX > rect.right) {
      $mousePosition.set(null);

      return;
    }

    if (
      event.clientY < rect.top + headerHeight ||
      event.clientY > rect.bottom
    ) {
      $mousePosition.set(null);

      return;
    }

    const containerMouseLeft = event.clientX - rect.left;
    const containerMouseTop = event.clientY - rect.top - headerHeight;

    $mousePosition.set([containerMouseLeft, containerMouseTop]);
  };

  const $mouseTime = computedQuant([$mousePosition], (mousePosition) => {
    if (!mousePosition) {
      return null;
    }

    const [mouseX, mouseY] = mousePosition;

    return (mouseY / dataHeight) * DAY_MS;
  });

  const setActiveNap = (napEvent: NapEvent | null) => {
    $activeNapEvent.set(napEvent);
  };

  const removeEventListener = addWindowEvent("mousemove", onMouseMove);

  const destroy = () => {
    $mouseTime.destroy();
    removeEventListener();
  };

  return { $mouseTime, $mousePosition, $activeNapEvent, destroy, setActiveNap };
}

export type MouseController = ReturnType<typeof initMouseController>;
