import { combineReducers } from "redux";
import { createReducer } from "utils/create-reducer";

export const modalOpened = createReducer<boolean>(
  {
    SHOW_SHARE_MODAL: () => true,
    CANCEL_SHARE_MODAL: () => false,
  },
  false
);

export const shareLink = createReducer<string | null>(
  {
    SET_SHARE_LINK: (_, action) => action.shareLink,
    CANCEL_SHARE_MODAL: () => null,
  },
  null
);

export const share = combineReducers({ modalOpened, shareLink });
