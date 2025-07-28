import { ActionHandler } from "types";
import { selectSettings } from "selectors";

export const setTheme: ActionHandler<"SET_THEME"> = async ({
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
