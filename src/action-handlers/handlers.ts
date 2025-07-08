import { setTheme } from "./set-theme";
import { ActionHandlers } from "types";
import { registerUser } from "./register-user";
import { loginUser } from "./login-user";
import { changePassword } from "./change-password";
import { forgetPassword } from "./forget-password";
import { resetPassword } from "./reset-password";
import { createNap } from "./create-nap";
import { setTimeZone } from "./set-timezone";
import { updateNap } from "./update-nap";
import { deleteNap } from "./delete-nap";
import { setPageVisibility } from "./set-page-visibility";

export const basicHandlers: ActionHandlers = {
  SET_THEME: setTheme,
  REGISTER_USER: registerUser,
  LOGIN_USER: loginUser,
  CHANGE_PASSWORD: changePassword,
  FORGET_PASSWORD: forgetPassword,
  RESET_PASSWORD: resetPassword,
  CREATE_NAP: createNap,
  UPDATE_NAP: updateNap,
  SET_TIME_ZONE: setTimeZone,
  DELETE_NAP: deleteNap,
  SET_PAGE_VISIBILITY: setPageVisibility,
};
