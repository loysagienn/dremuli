import { routeToAction } from "actions";
import { ActionHandler } from "types";

export const resetPassword: ActionHandler<"RESET_PASSWORD"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { password, token } = action;

  try {
    await api.resetPassword(password, token);

    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error("Reset password error", error);
  }
};
