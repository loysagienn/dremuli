import { ActionHandler } from "types";

export const changePassword: ActionHandler<"CHANGE_PASSWORD"> = async ({
  action,
  api,
  next,
}) => {
  next(action);

  const { password, newPassword } = action;

  try {
    await api.changePassword(password, newPassword);
  } catch (error) {
    console.error(error);
  }
};
