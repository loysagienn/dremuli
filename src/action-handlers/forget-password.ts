import { ActionHandler } from "types";

export const forgetPassword: ActionHandler<"FORGET_PASSWORD"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { email } = action;

  await api.forgetPassword(email);
};
