import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectNaps = (state: State) => state.naps;

export const selectNapsReverse = createSelector(selectNaps, (naps) =>
  naps.slice().reverse()
);
