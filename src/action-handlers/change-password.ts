import { routeToAction } from "actions";
import { ActionHandler } from "types";

export const changePassword: ActionHandler<"CHANGE_PASSWORD"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { password, newPassword } = action;

  try {
    await api.changePassword(password, newPassword);

    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
