import { ActionHandler } from "types";
import { setNaps } from "actions";
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
    const naps = await api.getNaps();

    dispatch(setNaps(naps));
  } catch (error) {
    console.error(error);
  }
};
