import { ActionHandler } from "types";
import { routeToAction, setNaps } from "actions";

export const updateNap: ActionHandler<"UPDATE_NAP"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { napId, update } = action;

  try {
    const nap = await api.updateNap(napId, update);
    const naps = await api.getNaps();

    dispatch(setNaps(naps));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
