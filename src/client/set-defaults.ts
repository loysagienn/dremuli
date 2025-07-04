import { Store } from "types";
import { selectTimeZone } from "selectors";
import { setTimeZone } from "actions";

export function setDefaults({ subscribe, getState, dispatch }: Store) {
  const activeTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timeZone = selectTimeZone(getState());

  if (timeZone !== activeTimeZone) {
    dispatch(setTimeZone(activeTimeZone));
  }
}
