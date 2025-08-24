import { setTheme } from "./set-theme";
import { ActionHandlers } from "types";
import { registerUser } from "./register-user";
import { loginUser } from "./login-user";
import { changePassword } from "./change-password";
import { forgetPassword } from "./forget-password";
import { resetPassword } from "./reset-password";
import { cerateEvent } from "./create-event";
import { setTimeZone } from "./set-timezone";
import { setLanguage } from "./set-language";
import { updateEvent } from "./update-event";
import { deleteEvent } from "./delete-event";
import { setPageVisibility } from "./set-page-visibility";
import { exportToJson } from "./export-to-json";

export const basicHandlers: ActionHandlers = {
  SET_THEME: setTheme,
  REGISTER_USER: registerUser,
  LOGIN_USER: loginUser,
  CHANGE_PASSWORD: changePassword,
  FORGET_PASSWORD: forgetPassword,
  RESET_PASSWORD: resetPassword,
  CREATE_EVENT: cerateEvent,
  UPDATE_EVENT: updateEvent,
  SET_TIME_ZONE: setTimeZone,
  SET_LANGUAGE: setLanguage,
  DELETE_EVENT: deleteEvent,
  SET_PAGE_VISIBILITY: setPageVisibility,
  EXPORT_TO_JSON: exportToJson,
};
