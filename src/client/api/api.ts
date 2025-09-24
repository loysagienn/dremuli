import {
  SessionSettings,
  Api,
  User,
  EventType,
  Event,
  EventUpdate,
  UserSettings,
  BatchEventData,
} from "types";
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

async function getUserSettings() {
  const userSettings = await request({ key: "api_user_settings" }, "GET");

  return userSettings as UserSettings | null;
}

async function setUserSettings(userSettings: UserSettings) {
  const result = await request({ key: "api_user_settings" }, "POST", {
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

  return result as { user: User; userSettings: UserSettings };
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

function parseEvent(data: any): Event | null {
  if (!data) {
    return null;
  }

  const { id, type, timestamp, createdAt, updatedAt } = data;

  return {
    id,
    type,
    timestamp: new Date(timestamp),
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}

async function createEvent(type: EventType, timestamp: Date) {
  const result = await request({ key: "api_events" }, "POST", {
    data: { type, timestamp },
  });

  return parseEvent(result);
}

async function createEventsBatch(events: BatchEventData[]): Promise<Event[]> {
  const result = await request({ key: "api_events_batch" }, "POST", {
    data: events,
  });

  return result.map(parseEvent);
}

async function updateEvent(eventId: string, update: EventUpdate) {
  const result = await request({ key: "api_event", eventId }, "POST", {
    data: update,
  });

  return parseEvent(result);
}

async function deleteEvent(eventId: string) {
  const result = await request({ key: "api_event", eventId }, "DELETE");

  return parseEvent(result);
}

async function getEvents(): Promise<Event[]> {
  const result = await request({ key: "api_events" }, "GET");

  return result.map(parseEvent);
}

async function createShareLink(
  startDate: Date,
  timeZone: string
): Promise<string> {
  const result = await request({ key: "api_share_link" }, "POST", {
    data: { startDate, timeZone },
  });

  return result;
}

export const api: Api = {
  getSessionSettings,
  setSessionSettings,
  getUserSettings,
  setUserSettings,
  registerUser,
  login,
  changePassword,
  forgetPassword,
  resetPassword,
  createEvent,
  createEventsBatch,
  getEvents,
  updateEvent,
  deleteEvent,
  createShareLink,
};
