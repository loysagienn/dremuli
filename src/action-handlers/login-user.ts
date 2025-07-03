import { ActionHandler } from "types";
import { setUser, routeToAction } from "actions";

export const loginUser: ActionHandler<"LOGIN_USER"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { email, password } = action;

  try {
    const user = await api.login(email, password);

    if (user) {
      dispatch(setUser(user));
      dispatch(routeToAction({ key: "home" }));
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
