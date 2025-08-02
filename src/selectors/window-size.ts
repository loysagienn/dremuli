import { createSelector } from "@reduxjs/toolkit";
import { Size, State } from "types";

export const selectWindowSize = (state: State) => state.windowSize;

export const selectContentSize = createSelector(
  selectWindowSize,
  (windowSize) => {
    const { width, height } = windowSize;

    const contentHeight = width <= 560 ? height - 80 : height - 48;

    return {
      width,
      height: contentHeight,
    };
  }
);
