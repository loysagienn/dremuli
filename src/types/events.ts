export type EventType = "fell_asleep" | "woke_up";

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
