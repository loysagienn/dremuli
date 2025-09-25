export type SetActiveTimezone = {
  type: "SET_ACTIVE_TIMEZONE";
  timeZone: string | null;
};

export function setActiveTimezoneAction(
  timeZone: string | null
): SetActiveTimezone {
  return {
    type: "SET_ACTIVE_TIMEZONE",
    timeZone,
  };
}
