export enum EventType {
  FellAsleep = "fell_asleep",
  WokeUp = "woke_up",
}

export type Event = {
  id: string;
  type: EventType;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type EventUpdate = {
  timestamp?: Date;
};

export type NapEvent = {
  event: Event;
  id: string;
  type: EventType;
  timestamp: Date;
  endTime: Date;
  timeStr: string;
  duration: number;
  dayStartStr?: string;
  isNightSleep: boolean;
};

export type BatchEventData = {
  type: EventType;
  timestamp: Date;
};
