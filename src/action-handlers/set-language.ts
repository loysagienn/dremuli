import { ActionHandler } from "types";
import { selectSettings, selectUser } from "selectors";

export const setLanguage: ActionHandler<"SET_LANGUAGE"> = async ({
  action,
  getState,
  api,
  next,
}) => {
  next(action);

  const settings = selectSettings(getState());
  const user = selectUser(getState());

  try {
    if (user) {
      const { language } = settings;

      await api.setUserSettings({ language });
    } else {
      await api.setSessionSettings(settings);
    }
  } catch (error) {
    console.error(error);
  }
};
