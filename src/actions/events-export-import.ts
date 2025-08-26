import { BatchEventData, Event } from "types";

export type ShowExportToJson = {
  type: "SHOW_EXPORT_TO_JSON";
};

export function showExportToJsonAction(): ShowExportToJson {
  return {
    type: "SHOW_EXPORT_TO_JSON",
  };
}

export type CancelExportToJson = {
  type: "CANCEL_EXPORT_TO_JSON";
};

export function cancelExportToJsonAction(): CancelExportToJson {
  return {
    type: "CANCEL_EXPORT_TO_JSON",
  };
}

export type ExportToJson = {
  type: "EXPORT_TO_JSON";
  dateFrom: Date;
  dateTo: Date;
};

export function exportToJsonAction(dateFrom: Date, dateTo: Date): ExportToJson {
  return {
    type: "EXPORT_TO_JSON",
    dateFrom,
    dateTo,
  };
}

export type ShowImportFromJson = {
  type: "SHOW_IMPORT_FROM_JSON";
};

export function showImportFromJsonAction(): ShowImportFromJson {
  return {
    type: "SHOW_IMPORT_FROM_JSON",
  };
}

export type CancelImportFromJson = {
  type: "CANCEL_IMPORT_FROM_JSON";
};

export function cancelImportFromJsonAction(): CancelImportFromJson {
  return {
    type: "CANCEL_IMPORT_FROM_JSON",
  };
}

export type ImportFromJsonFile = {
  type: "IMPORT_FROM_JSON_FILE";
  file: File;
};

export function importFromJsonFile(file: File): ImportFromJsonFile {
  return {
    type: "IMPORT_FROM_JSON_FILE",
    file,
  };
}

export type ImportFromJsonFileDone = {
  type: "IMPORT_FROM_JSON_FILE_DONE";
  importEvents: BatchEventData[];
};

export function importFromJsonFileDone(
  importEvents: BatchEventData[]
): ImportFromJsonFileDone {
  return {
    type: "IMPORT_FROM_JSON_FILE_DONE",
    importEvents,
  };
}

export type ImportFromJsonFileFail = {
  type: "IMPORT_FROM_JSON_FILE_FAIL";
  errorMessage: string;
};

export function importFromJsonFileFail(
  errorMessage: string
): ImportFromJsonFileFail {
  return {
    type: "IMPORT_FROM_JSON_FILE_FAIL",
    errorMessage,
  };
}

export type ImportFromJsonDone = {
  type: "IMPORT_FROM_JSON_DONE";
  events: Event[];
};

export function importFromJsonDone(events: Event[]): ImportFromJsonDone {
  return {
    type: "IMPORT_FROM_JSON_DONE",
    events,
  };
}
