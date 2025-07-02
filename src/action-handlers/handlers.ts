import { setTheme } from "./set-theme";
import { ActionHandlers } from "types";
import { registerUser } from "./register-user";
import { loginUser } from "./login-user";
import { changePassword } from "./change-password";
import { forgetPassword } from "./forget-password";
import { resetPassword } from "./reset-password";

export const basicHandlers: ActionHandlers = {
  SET_THEME: setTheme,
  REGISTER_USER: registerUser,
  LOGIN_USER: loginUser,
  CHANGE_PASSWORD: changePassword,
  FORGET_PASSWORD: forgetPassword,
  RESET_PASSWORD: resetPassword,
};
