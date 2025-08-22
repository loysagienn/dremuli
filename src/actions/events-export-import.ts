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
