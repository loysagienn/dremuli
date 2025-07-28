import { Lang } from "./lang";

export type SessionSettings = {
  theme: "light" | "dark";
  timeZone: string;
  language: Lang;
};

export type UserSettings = {
  language: Lang;
};
