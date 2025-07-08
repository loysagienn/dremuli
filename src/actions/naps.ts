import { Nap, NapUpdate } from "types";

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

export type UpdateNap = {
  type: "UPDATE_NAP";
  napId: string;
  update: NapUpdate;
};

export function updateNapAction(napId: string, update: NapUpdate): UpdateNap {
  return {
    type: "UPDATE_NAP",
    napId,
    update,
  };
}

export type DeleteNap = {
  type: "DELETE_NAP";
  napId: string;
};

export function deleteNapAction(napId: string): DeleteNap {
  return {
    type: "DELETE_NAP",
    napId,
  };
}
