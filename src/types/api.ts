import { UserSettings } from "./user";
import { User } from "./db";

export type Api = {
  setUserSettings: (settings: UserSettings) => Promise<UserSettings>;
  getUserSettings: () => Promise<UserSettings>;
  registerUser: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  changePassword: (password: string, newPassword: string) => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
};
