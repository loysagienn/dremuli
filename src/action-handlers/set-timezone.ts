import { ActionHandler } from "types";
import { selectSettings } from "selectors";

export const setTimeZone: ActionHandler<"SET_TIME_ZONE"> = async ({
  action,
  getState,
  api,
  next,
}) => {
  next(action);

  const settings = selectSettings(getState());

  try {
    await api.setSessionSettings(settings);
  } catch (error) {
    console.error(error);
  }
};
