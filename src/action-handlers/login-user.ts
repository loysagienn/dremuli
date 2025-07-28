import { ActionHandler } from "types";
import { setUserAction, routeToAction, setEventsAction } from "actions";

export const loginUser: ActionHandler<"LOGIN_USER"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { email, password } = action;

  try {
    const { user, userSettings } = await api.login(email, password);

    if (user) {
      const events = await api.getEvents();

      dispatch(setUserAction(user, userSettings));
      dispatch(setEventsAction(events));
      dispatch(routeToAction({ key: "home" }));
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
