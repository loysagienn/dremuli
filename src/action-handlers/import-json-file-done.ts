import { importFromJsonDone, setEventsAction } from "actions";
import { ActionHandler } from "types";

export const importFromJsonFileDone: ActionHandler<
  "IMPORT_FROM_JSON_FILE_DONE"
> = async ({ action, dispatch, api, next }) => {
  next(action);

  const { importEvents } = action;

  try {
    const createdEvents = await api.createEventsBatch(importEvents);
    const events = await api.getEvents();

    dispatch(importFromJsonDone(createdEvents));
    dispatch(setEventsAction(events));
  } catch (error) {
    console.error("Batch events create error", error);
  }
};
