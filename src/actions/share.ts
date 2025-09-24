export type ShowShareModal = {
  type: "SHOW_SHARE_MODAL";
};

export function showShareModalAction(): ShowShareModal {
  return {
    type: "SHOW_SHARE_MODAL",
  };
}

export type CancelShareModal = {
  type: "CANCEL_SHARE_MODAL";
};

export function cancelShareModalAction(): CancelShareModal {
  return {
    type: "CANCEL_SHARE_MODAL",
  };
}

export type ShareEvents = {
  type: "SHARE_EVENTS";
  fromDate: Date;
};

export function shareEventsAction(fromDate: Date): ShareEvents {
  return {
    type: "SHARE_EVENTS",
    fromDate,
  };
}

export type SetShareLink = {
  type: "SET_SHARE_LINK";
  shareLink: string;
};

export function setShareLinkAction(shareLink: string): SetShareLink {
  return {
    type: "SET_SHARE_LINK",
    shareLink,
  };
}
