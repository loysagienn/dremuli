import { ConfirmableAction } from "types";
import { createReducer } from "utils/create-reducer";

export const activeTimezone = createReducer<string | null>(
  {
    SET_ACTIVE_TIMEZONE: (state, { timeZone }) => timeZone,
  },
  null
);
