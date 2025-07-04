import { ActionHandler } from "types";
import { routeToAction, setNaps, setUser } from "actions";

export const createNap: ActionHandler<"CREATE_NAP"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { startTime, endTime } = action;

  try {
    const nap = await api.createNap(startTime, endTime);
    const naps = await api.getNaps();

    dispatch(setNaps(naps));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
