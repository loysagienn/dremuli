import { Nap } from "types";

export type CreateNap = {
  type: "CREATE_NAP";
  startTime: Date;
  endTime?: Date | null;
};

export function createNapAction(
  startTime: Date,
  endTime?: Date | null
): CreateNap {
  return {
    type: "CREATE_NAP",
    startTime,
    endTime,
  };
}

export type SetNaps = {
  type: "SET_NAPS";
  naps: Nap[];
};

export function setNaps(naps: Nap[]): SetNaps {
  return {
    type: "SET_NAPS",
    naps,
  };
}
