import { Size } from "types";

export type SetPageVisibility = {
  type: "SET_PAGE_VISIBILITY";
  visible: boolean;
};

export function setPageVisible(visible: boolean): SetPageVisibility {
  return {
    type: "SET_PAGE_VISIBILITY",
    visible,
  };
}

export type SetWindowSize = {
  type: "SET_WINDOW_SIZE";
  size: Size;
};

export function setWindowSizeAction(size: Size): SetWindowSize {
  return {
    type: "SET_WINDOW_SIZE",
    size,
  };
}
