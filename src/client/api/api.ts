import { SessionSettings, Api, User, Nap } from "types";
import { request } from "./request";

async function getSessionSettings() {
  const sessionSettings = await request({ key: "api_settings" }, "GET");

  return sessionSettings as SessionSettings;
}

async function setSessionSettings(sessionSettings: SessionSettings) {
  const result = await request({ key: "api_settings" }, "POST", {
    data: sessionSettings,
  });

  return result as SessionSettings;
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

async function createNap(startTime: Date, endTime?: Date | null) {
  const result = await request({ key: "api_naps" }, "POST", {
    data: { startTime, endTime },
  });

  return result as Nap;
}

async function getNaps() {
  const result = await request({ key: "api_naps" }, "GET");

  return result as Nap[];
}

export const api: Api = {
  getSessionSettings,
  setSessionSettings,
  registerUser,
  login,
  changePassword,
  forgetPassword,
  resetPassword,
  createNap,
  getNaps,
};
