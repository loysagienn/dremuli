import { ScrollManager } from "./scroll-manager";
import styles from "./infinite-scroll.module.css";
import { SCROLLABLE_SIZE } from "./constants";
import { debounce } from "utils/debounce";
import { computedQuant, Quant } from "utils/quant";

function setSnapElementsPosition(
  snapNodes: HTMLDivElement[],
  scrollManager: ScrollManager,
  pixelSnapSize: number,
  direction: "vertical" | "horizontal",
  pixelValue: number
) {
  const scrollValue = scrollManager.$scrollValue.get();
  const containerSize = scrollManager.$containerSize.get();
  const valueDiff = pixelValue % pixelSnapSize;
  const center = scrollValue - pixelSnapSize / 2 + containerSize / 2;
  let offset = (center % pixelSnapSize) - valueDiff;

  if (direction === "vertical") {
    for (let i = 0; i < snapNodes.length; i++) {
      const node = snapNodes[i];

      node.style.top = `${pixelSnapSize * i + offset}px`;
    }
  } else {
    for (let i = 0; i < snapNodes.length; i++) {
      const node = snapNodes[i];

      node.style.left = `${pixelSnapSize * i + offset}px`;
    }
  }
}

function getSnapElements(
  pixelSnapSize: number,
  direction: "horizontal" | "vertical"
) {
  const snapElementsCount = Math.floor(SCROLLABLE_SIZE / pixelSnapSize) - 1;

  const snapNodes: HTMLDivElement[] = [];

  for (let i = 0; i < snapElementsCount; i++) {
    const node = document.createElement("div");
    node.classList.add(styles.snapTarget);

    if (direction === "vertical") {
      node.style.height = `${pixelSnapSize}px`;
    } else {
      node.style.width = `${pixelSnapSize}px`;
    }

    snapNodes.push(node);
  }

  return snapNodes;
}

export function initSnapping(
  scrollManager: ScrollManager,
  snapSize: number,
  direction: "horizontal" | "vertical",
  $value: Quant<number>,
  $scale: Quant<number>,
  updateValue: (value: number) => void
): [() => void] {
  if (!snapSize || typeof document === "undefined") {
    return [() => {}];
  }

  const $pixelSnapSize = computedQuant([$scale], (scale) => snapSize / scale);
  const $pixelValue = computedQuant(
    [$value, $scale],
    (value, scale) => value / scale
  );

  const $snapElements = computedQuant([$pixelSnapSize], (pixelSnapSize) => {
    return getSnapElements(pixelSnapSize, direction);
  });
  let currScrollableNode = null;
  let currSnapElements = $snapElements.get();

  const appendSnapElements = () => {
    const scrollableNode = scrollManager.$scrollableNode.get();
    const snapElements = $snapElements.get();

    if (
      currScrollableNode === scrollableNode &&
      currSnapElements === snapElements
    ) {
      return;
    }

    if (scrollableNode) {
      scrollableNode.innerHTML = "";

      snapElements.forEach((node) => scrollableNode.appendChild(node));
    }

    currScrollableNode = scrollableNode;
    currSnapElements = snapElements;
  };

  const updateSnapElements = () => {
    appendSnapElements();

    const snapElements = $snapElements.get();
    const pixelSnapSize = $pixelSnapSize.get();
    const pixelValue = $pixelValue.get();

    setSnapElementsPosition(
      snapElements,
      scrollManager,
      pixelSnapSize,
      direction,
      pixelValue
    );
  };

  const onScale = debounce(() => {
    const value = $value.get();
    const targetValue = Math.round(value / snapSize) * snapSize;

    updateValue(targetValue);
  }, 100);

  $scale.listen(onScale);

  // $snapElements.listen(debounce(updateSnapElements, 100));

  return [updateSnapElements];
}
