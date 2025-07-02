import { ActionHandler } from "types";
import { setUser } from "actions";

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

    dispatch(setUser(user));
  } catch (error) {
    console.error(error);
  }
};
