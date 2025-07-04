import { createReducer } from "utils/create-reducer";
import { Nap } from "types";

export const naps = createReducer<Nap[]>(
  {
    SET_NAPS: (state, { naps }) => naps,
  },
  []
);
