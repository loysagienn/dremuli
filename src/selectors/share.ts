import { State } from "types";
import { createSelector } from "@reduxjs/toolkit";

export const selectShare = (state: State) => state.share;

export const selectShareModalOpened = createSelector(
  selectShare,
  (share) => share.modalOpened
);

export const selectShareLink = createSelector(
  selectShare,
  (share) => share.shareLink
);
