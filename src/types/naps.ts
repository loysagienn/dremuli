export type Nap = {
  id: string;
  startTime: Date;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum NapEventType {
  Sleep = "sleep",
  Awake = "awake",
}

export type NapEvent = {
  id: string;
  nap: Nap;
  time: Date;
  timeStr: string;
  type: NapEventType;
  duration: number;
  durationStr: string;
  dayStartStr?: string;
};

export type NapUpdate = {
  startTime?: Date;
  endTime?: Date | null;
};
