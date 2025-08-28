import { ConfirmableAction } from "types";
import { createReducer } from "utils/create-reducer";

export const confirmAction = createReducer<ConfirmableAction | null>(
  {
    CONFIRM: (state, { action }) => action,
    CONFIRM_APPROVE: () => null,
    CONFIRM_DECLINE: () => null,
  },
  null
);
