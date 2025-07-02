import { ActionHandler } from "types";
import { setUser } from "actions";

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
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
