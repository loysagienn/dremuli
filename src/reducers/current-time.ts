import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";
import { getCurrentDay, getCurrentMinute } from "utils/date";

export const time = createReducer<Date>(
  {
    SET_CURRENT_TIME: (state, { currentTime }) => currentTime,
  },
  getCurrentMinute()
);

export const date = createReducer<Date>(
  {
    SET_CURRENT_TIME: (state, { currentTime }) => {
      if (currentTime.getDate() === state.getDate()) {
        return state;
      }

      const date = new Date(currentTime);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      return date;
    },
  },
  getCurrentDay()
);

export const currentTime = combineReducers({ time, date });
