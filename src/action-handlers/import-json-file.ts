import { importFromJsonFileFail, importFromJsonFileDone } from "actions";
import { ActionHandler, BatchEventData } from "types";
import { readJsonFile } from "utils/read-json-file";

function getImportEvents(data: any): BatchEventData[] {
  const events = data && data.events;

  if (!events || !Array.isArray(events)) {
    throw new Error("Invalid JSON");
  }

  const importEvents = events.map((event) => {
    if (!event || typeof event !== "object") {
      throw new Error("Invalid JSON");
    }

    const { type, timestamp, comment } = event;

    if (type !== "woke_up" && type !== "fell_asleep") {
      throw new Error("Invalid JSON");
    }

    if (!timestamp) {
      throw new Error("Invalid JSON");
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      throw new Error("Invalid JSON");
    }

    if (comment && typeof comment !== "string") {
      throw new Error("Invalid JSON");
    }

    return {
      type,
      timestamp: date,
      comment,
    } as BatchEventData;
  });

  return importEvents;
}

export const importFromJsonFile: ActionHandler<
  "IMPORT_FROM_JSON_FILE"
> = async ({ action, dispatch, api, next }) => {
  next(action);

  const { file } = action;

  try {
    const content = await readJsonFile(file);

    const importEvents = getImportEvents(content);

    dispatch(importFromJsonFileDone(importEvents));
  } catch (error) {
    dispatch(
      importFromJsonFileFail(error instanceof Error ? error.message : error)
    );
  }
};
