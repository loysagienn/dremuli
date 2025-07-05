import { Store } from "types";
import { selectCurrentTime, selectTimeZone } from "selectors";
import { setCurrentTimeAction, setTimeZone } from "actions";
import { getCurrentMinute } from "utils/date";

export function setDefaults({ subscribe, getState, dispatch }: Store) {
  const activeTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timeZone = selectTimeZone(getState());

  if (timeZone !== activeTimeZone) {
    dispatch(setTimeZone(activeTimeZone));
  }

  setInterval(() => {
    const currentTime = selectCurrentTime(getState());

    const currentMinute = getCurrentMinute();

    if (currentMinute.getTime() !== currentTime.getTime()) {
      dispatch(setCurrentTimeAction(currentMinute));
    }
  }, 1000);
}
