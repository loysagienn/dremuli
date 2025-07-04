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
