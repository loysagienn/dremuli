import { Store } from "types";
import { selectCurrentTime, selectTimeZone, selectWindowSize } from "selectors";
import {
  setCurrentTimeAction,
  setPageVisible,
  setTimeZone,
  setWindowSizeAction,
} from "actions";
import { getCurrentMinute } from "utils/date";
import { selectPageVisible } from "selectors/page";
import { getWindowSize } from "utils/browser";

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

  document.addEventListener("visibilitychange", () => {
    const pageIsVisible = selectPageVisible(getState());

    const isVisible = document.visibilityState === "visible";

    if (pageIsVisible !== isVisible) {
      dispatch(setPageVisible(isVisible));
    }
  });

  const updateWindowSize = () => {
    const windowSize = selectWindowSize(getState());

    const actualWindowSize = getWindowSize();

    if (
      actualWindowSize.width !== windowSize.width ||
      actualWindowSize.height !== windowSize.height
    ) {
      dispatch(setWindowSizeAction(actualWindowSize));
    }
  };

  updateWindowSize();
  window.addEventListener("resize", updateWindowSize);
}
