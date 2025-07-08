import { ActionHandler } from "types";
import { routeToAction, setNaps } from "actions";

export const deleteNap: ActionHandler<"DELETE_NAP"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { napId } = action;

  try {
    const nap = await api.deleteNap(napId);
    const naps = await api.getNaps();

    dispatch(setNaps(naps));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
