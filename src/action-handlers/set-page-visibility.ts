import { ActionHandler } from "types";
import { setEventsAction } from "actions";
import { selectUser } from "selectors";

export const setPageVisibility: ActionHandler<"SET_PAGE_VISIBILITY"> = async ({
  action,
  getState,
  dispatch,
  api,
  next,
}) => {
  next(action);

  if (!action.visible) {
    return;
  }

  const user = selectUser(getState());

  if (!user) {
    return;
  }

  try {
    const events = await api.getEvents();

    dispatch(setEventsAction(events));
  } catch (error) {
    console.error(error);
  }
};
