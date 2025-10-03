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
  comment?: string | null;
};

export type EventUpdate = {
  timestamp?: Date;
  comment?: string | null;
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
  comment?: string | null;
};

export type BatchEventData = {
  type: EventType;
  timestamp: Date;
  comment?: string | null;
};
