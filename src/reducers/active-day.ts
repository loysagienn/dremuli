import { createReducer } from "utils/create-reducer";

export const activeDay = createReducer<Date | null>(
  {
    SET_ACTIVE_DAY: (state, { activeDay }) => activeDay,
  },
  null
);
