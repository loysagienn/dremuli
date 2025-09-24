import { ActionHandler } from "types";
import { setShareLinkAction } from "actions";
import { selectTimeZone } from "selectors";

export const shareEvents: ActionHandler<"SHARE_EVENTS"> = async ({
  action,
  dispatch,
  api,
  next,
  getState,
}) => {
  next(action);

  const { fromDate } = action;
  const timeZone = selectTimeZone(getState());

  try {
    const shareLink = await api.createShareLink(fromDate, timeZone);

    dispatch(setShareLinkAction(shareLink));
  } catch (error) {
    console.error("Share link creation failed", error);
  }
};
