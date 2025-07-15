import { SessionSettings } from "./user";
import { User } from "./db";
import { Event, EventUpdate, EventType } from "./events";

export type Api = {
  setSessionSettings: (settings: SessionSettings) => Promise<SessionSettings>;
  getSessionSettings: () => Promise<SessionSettings>;
  registerUser: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  changePassword: (password: string, newPassword: string) => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  createEvent: (type: EventType, timestamp: Date) => Promise<Event>;
  updateEvent: (eventId: string, update: EventUpdate) => Promise<Event>;
  getEvents: () => Promise<Event[]>;
  deleteEvent: (eventId: string) => Promise<Event | null>;
};
