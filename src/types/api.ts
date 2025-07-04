import { SessionSettings } from "./user";
import { User } from "./db";
import { Nap, NapUpdate } from "./naps";

export type Api = {
  setSessionSettings: (settings: SessionSettings) => Promise<SessionSettings>;
  getSessionSettings: () => Promise<SessionSettings>;
  registerUser: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  changePassword: (password: string, newPassword: string) => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  createNap: (startTime: Date, endTime?: Date | null) => Promise<Nap>;
  updateNap: (napId: string, update: NapUpdate) => Promise<Nap>;
  getNaps: () => Promise<Nap[]>;
};
