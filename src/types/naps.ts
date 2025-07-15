import { Event } from "./events";

export type Nap = {
  id: string;
  startTime: Date;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NapExtend = {
  id: string;
  startTime: Date;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  isNightSleep: boolean;
};

export enum NapEventType {
  Sleep = "sleep",
  Awake = "awake",
}

export type NapEvent = {
  id: string;
  event: Event;
  time: Date;
  endTime: Date;
  timeStr: string;
  type: NapEventType;
  duration: number;
  durationStr: string;
  dayStartStr?: string;
  isNightSleep: boolean;
};

export type NapUpdate = {
  startTime?: Date;
  endTime?: Date | null;
};
