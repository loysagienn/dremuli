import { DivPosition } from "utils/div-position";
import { PopupPosition } from "./types";
import { DivSize } from "utils/div-size";

const setters: {
  [key in PopupPosition]: (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => void;
} = {
  top: (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const bottom = targetPosition.windowHeight - targetPosition.top + offset;
    const targetWidth = targetPosition.right - targetPosition.left;
    const left = targetPosition.left - popupSize.width / 2 + targetWidth / 2;

    popupNode.style.top = ``;
    popupNode.style.bottom = `${bottom}px`;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "top-left": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const bottom = targetPosition.windowHeight - targetPosition.top + offset;
    const left = targetPosition.left;

    popupNode.style.top = ``;
    popupNode.style.bottom = `${bottom}px`;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "top-right": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const bottom = targetPosition.windowHeight - targetPosition.top + offset;
    const right = targetPosition.windowWidth - targetPosition.right;

    popupNode.style.top = ``;
    popupNode.style.bottom = `${bottom}px`;
    popupNode.style.left = ``;
    popupNode.style.right = `${right}px`;
  },
  bottom: (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const top = targetPosition.bottom + offset;
    const targetWidth = targetPosition.right - targetPosition.left;
    const left = targetPosition.left - popupSize.width / 2 + targetWidth / 2;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "bottom-left": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const top = targetPosition.bottom + offset;
    const left = targetPosition.left;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "bottom-right": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const top = targetPosition.bottom + offset;
    const right = targetPosition.windowWidth - targetPosition.right;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = ``;
    popupNode.style.right = `${right}px`;
  },
  left: (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const right = targetPosition.windowWidth - targetPosition.left + offset;
    const targetHeight = targetPosition.bottom - targetPosition.top;
    const top = targetPosition.top - popupSize.height / 2 + targetHeight / 2;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = ``;
    popupNode.style.right = `${right}px`;
  },
  "left-top": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const right = targetPosition.windowWidth - targetPosition.left + offset;
    const top = targetPosition.top;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = ``;
    popupNode.style.right = `${right}px`;
  },
  "left-bottom": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const right = targetPosition.windowWidth - targetPosition.left + offset;
    const bottom = targetPosition.windowHeight - targetPosition.bottom;

    popupNode.style.top = ``;
    popupNode.style.bottom = `${bottom}px`;
    popupNode.style.left = ``;
    popupNode.style.right = `${right}px`;
  },
  right: (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const left = targetPosition.right + offset;
    const targetHeight = targetPosition.bottom - targetPosition.top;
    const top = targetPosition.top - popupSize.height / 2 + targetHeight / 2;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "right-top": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const left = targetPosition.right + offset;
    const top = targetPosition.top;

    popupNode.style.top = `${top}px`;
    popupNode.style.bottom = ``;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
  "right-bottom": (
    targetPosition: DivPosition,
    popupSize: DivSize,
    popupNode: HTMLDivElement,
    offset: number
  ) => {
    const left = targetPosition.right + offset;
    const bottom = targetPosition.windowHeight - targetPosition.bottom;

    popupNode.style.top = ``;
    popupNode.style.bottom = `${bottom}px`;
    popupNode.style.left = `${left}px`;
    popupNode.style.right = ``;
  },
};

export function setPopupPosition(
  targetPosition: DivPosition,
  popupSize: DivSize,
  popupNode: HTMLDivElement,
  position: PopupPosition,
  offset: number
) {
  const setter = setters[position];

  setter(targetPosition, popupSize, popupNode, offset);
}
