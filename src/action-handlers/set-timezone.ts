import { ActionHandler } from "types";
import { selectSessionSettings } from "selectors";

export const setTimeZone: ActionHandler<"SET_TIME_ZONE"> = async ({
  action,
  getState,
  api,
  next,
}) => {
  next(action);

  const sessionSettings = selectSessionSettings(getState());

  try {
    await api.setSessionSettings(sessionSettings);
  } catch (error) {
    console.error(error);
  }
};
