import { createReducer } from "utils/create-reducer";
import { getCurrentMinute } from "utils/date";

export const currentTime = createReducer<Date>(
  {
    SET_CURRENT_TIME: (state, { currentTime }) => currentTime,
  },
  getCurrentMinute()
);
