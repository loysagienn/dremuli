export type SetCurrentTime = {
  type: "SET_CURRENT_TIME";
  currentTime: Date;
};

export function setCurrentTimeAction(currentTime: Date): SetCurrentTime {
  return {
    type: "SET_CURRENT_TIME",
    currentTime,
  };
}
