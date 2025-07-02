import { User } from "types";
import { createReducer } from "utils/create-reducer";

export const user = createReducer<User | null>(
  {
    SET_USER: (state, { user }) => user,
  },
  null
);
