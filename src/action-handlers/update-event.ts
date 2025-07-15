import { ActionHandler } from "types";
import { routeToAction, setEventsAction } from "actions";

export const updateEvent: ActionHandler<"UPDATE_EVENT"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { eventId, update } = action;

  try {
    const event = await api.updateEvent(eventId, update);
    const events = await api.getEvents();

    dispatch(setEventsAction(events));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
