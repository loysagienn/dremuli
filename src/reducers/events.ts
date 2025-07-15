import { createReducer } from "utils/create-reducer";
import { Event } from "types";

export const events = createReducer<Event[]>(
  {
    SET_EVENTS: (state, { events }) => events,
  },
  []
);
