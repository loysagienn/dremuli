import { State } from "types";

export const selectCurrentTime = (state: State) => state.currentTime.time;

export const selectCurrentDay = (state: State) => state.currentTime.date;
