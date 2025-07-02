import { UserSettings, Api, User } from "types";
import { request } from "./request";

async function getUserSettings() {
  const userSettings = await request({ key: "api_settings" }, "GET");

  return userSettings as UserSettings;
}

async function setUserSettings(userSettings: UserSettings) {
  const result = await request({ key: "api_settings" }, "POST", {
    data: userSettings,
  });

  return result as UserSettings;
}

async function registerUser(email: string, password: string) {
  const result = await request({ key: "api_register_user" }, "POST", {
    data: { email, password },
  });

  return result as User;
}

async function login(email: string, password: string) {
  const result = await request({ key: "api_login" }, "POST", {
    data: { email, password },
  });

  return result as User;
}

async function changePassword(password: string, newPassword: string) {
  await request({ key: "api_change_password" }, "POST", {
    data: { password, newPassword },
  });
}

async function forgetPassword(email: string) {
  await request({ key: "api_forget_password" }, "POST", {
    data: { email },
  });
}

async function resetPassword(password: string, token: string) {
  await request({ key: "api_reset_password" }, "POST", {
    data: { password, token },
  });
}

export const api: Api = {
  getUserSettings,
  setUserSettings,
  registerUser,
  login,
  changePassword,
  forgetPassword,
  resetPassword,
};
