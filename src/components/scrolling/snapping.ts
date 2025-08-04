import { ScrollManager } from "./scroll-manager";
import { Atom } from "nanostores";
import styles from "./infinite-scroll.module.css";
import { SCROLLABLE_SIZE } from "./constants";

function setSnapElementsPosition(
  snapNodes: HTMLDivElement[],
  scrollManager: ScrollManager,
  snapSize: number,
  direction: "vertical" | "horizontal",
  value: number
) {
  const scrollValue = scrollManager.$scrollValue.get();
  const containerSize = scrollManager.$containerSize.get();
  const valueDiff = value % snapSize;
  const center = scrollValue - snapSize / 2 + containerSize / 2;
  let offset = (center % snapSize) - valueDiff;

  if (direction === "vertical") {
    for (let i = 0; i < snapNodes.length; i++) {
      const node = snapNodes[i];

      node.style.top = `${snapSize * i + offset}px`;
    }
  } else {
    for (let i = 0; i < snapNodes.length; i++) {
      const node = snapNodes[i];

      node.style.left = `${snapSize * i + offset}px`;
    }
  }
}

function getSnapElements(
  snapSize: number,
  direction: "horizontal" | "vertical"
) {
  const snapElementsCount = Math.floor(SCROLLABLE_SIZE / snapSize) - 1;

  const snapNodes: HTMLDivElement[] = [];

  for (let i = 0; i < snapElementsCount; i++) {
    const node = document.createElement("div");
    node.classList.add(styles.snapTarget);

    if (direction === "vertical") {
      node.style.height = `${snapSize}px`;
    } else {
      node.style.width = `${snapSize}px`;
    }

    snapNodes.push(node);
  }

  return snapNodes;
}

export function initSnapping(
  scrollManager: ScrollManager,
  snapSize: number,
  direction: "horizontal" | "vertical",
  $value: Atom<number>
): [() => void] {
  if (!snapSize || typeof document === "undefined") {
    return [() => {}];
  }

  const snapElements = getSnapElements(snapSize, direction);
  let currScrollableNode = null;

  const appendSnapElements = () => {
    const scrollableNode = scrollManager.$scrollableNode.get();

    if (currScrollableNode === scrollableNode) {
      return;
    }

    if (scrollableNode) {
      scrollableNode.innerHTML = "";

      snapElements.forEach((node) => scrollableNode.appendChild(node));
    }

    currScrollableNode = scrollableNode;
  };

  const updateSnapElements = () => {
    appendSnapElements();

    setSnapElementsPosition(
      snapElements,
      scrollManager,
      snapSize,
      direction,
      $value.get()
    );
  };

  return [updateSnapElements];
}
