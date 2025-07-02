import { ActionHandler } from "types";
import { selectUserSettings } from "selectors";

export const setTheme: ActionHandler<"SET_THEME"> = async ({
  action,
  getState,
  api,
  next,
}) => {
  next(action);

  const userSettings = selectUserSettings(getState());

  try {
    await api.setUserSettings(userSettings);
  } catch (error) {
    console.error(error);
  }
};
