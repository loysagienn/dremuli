import { DivPosition } from "utils/div-position";

export function setPopupPosition(
  targetPosition: DivPosition,
  popupNode: HTMLDivElement
) {
  const { innerHeight, innerWidth } = window;

  const bottom = innerHeight - targetPosition.top + 8;
  const right = innerWidth - targetPosition.right;

  popupNode.style.bottom = `${bottom}px`;
  popupNode.style.right = `${right}px`;
}
