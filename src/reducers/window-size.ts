import { Size } from "types";
import { createReducer } from "utils/create-reducer";
import { getWindowSize } from "utils/browser";

export const windowSize = createReducer<Size>(
  {
    SET_WINDOW_SIZE: (state, { size }) => size,
  },
  getWindowSize()
);
