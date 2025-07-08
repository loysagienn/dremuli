import { createReducer } from "utils/create-reducer";

export const pageVisibility = createReducer<boolean>(
  {
    SET_PAGE_VISIBILITY: (state, { visible }) => visible,
  },
  true
);
