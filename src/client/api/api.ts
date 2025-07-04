import { SessionSettings, Api, User, Nap, NapUpdate } from "types";
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

function parseNap(data: any): Nap {
  const { id, startTime, endTime, createdAt, updatedAt } = data;

  return {
    id,
    startTime: new Date(startTime),
    endTime: endTime ? new Date(endTime) : null,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}

async function createNap(startTime: Date, endTime?: Date | null) {
  const result = await request({ key: "api_naps" }, "POST", {
    data: { startTime, endTime },
  });

  return parseNap(result);
}

async function updateNap(napId: string, update: NapUpdate) {
  const result = await request({ key: "api_nap", napId }, "POST", {
    data: update,
  });

  return parseNap(result);
}

async function getNaps(): Promise<Nap[]> {
  const result = await request({ key: "api_naps" }, "GET");

  return result.map(parseNap);
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
  updateNap,
};
