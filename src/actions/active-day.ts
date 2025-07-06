export type SetActiveDay = {
  type: "SET_ACTIVE_DAY";
  activeDay: Date;
};

export function setActiveDayAction(activeDay: Date): SetActiveDay {
  return {
    type: "SET_ACTIVE_DAY",
    activeDay,
  };
}
