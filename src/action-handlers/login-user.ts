import { ActionHandler } from "types";
import { setUser, routeToAction, setNaps } from "actions";

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
      const naps = await api.getNaps();

      dispatch(setUser(user));
      dispatch(setNaps(naps));
      dispatch(routeToAction({ key: "home" }));
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
