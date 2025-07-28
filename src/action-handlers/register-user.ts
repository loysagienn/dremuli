import { ActionHandler } from "types";
import { routeToAction, setUserAction } from "actions";

export const registerUser: ActionHandler<"REGISTER_USER"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { email, password } = action;

  try {
    const user = await api.registerUser(email, password);

    dispatch(setUserAction(user));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
