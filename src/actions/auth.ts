import { AppRoute } from "app/router";
import { User, UserSettings } from "types";

export type RegisterUser = {
  type: "REGISTER_USER";
  email: string;
  password: string;
};

export function registerUser(email: string, password: string): RegisterUser {
  return {
    type: "REGISTER_USER",
    email,
    password,
  };
}

export type LoginUser = {
  type: "LOGIN_USER";
  email: string;
  password: string;
};

export function loginUser(email: string, password: string): LoginUser {
  return {
    type: "LOGIN_USER",
    email,
    password,
  };
}

export type SetUser = {
  type: "SET_USER";
  user: User;
  userSettings?: UserSettings;
};

export function setUserAction(
  user: User,
  userSettings?: UserSettings
): SetUser {
  return {
    type: "SET_USER",
    user,
    userSettings,
  };
}

export type ChangePassword = {
  type: "CHANGE_PASSWORD";
  password: string;
  newPassword: string;
};

export function changePassword(
  password: string,
  newPassword: string
): ChangePassword {
  return {
    type: "CHANGE_PASSWORD",
    password,
    newPassword,
  };
}

export type ForgetPassword = {
  type: "FORGET_PASSWORD";
  email: string;
};

export function forgetPassword(email: string): ForgetPassword {
  return {
    type: "FORGET_PASSWORD",
    email,
  };
}

export type ResetPassword = {
  type: "RESET_PASSWORD";
  password: string;
  token: string;
};

export function resetPassword(password: string, token: string): ResetPassword {
  return {
    type: "RESET_PASSWORD",
    password,
    token,
  };
}
