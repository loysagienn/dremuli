import { ActionHandler } from "types";
import { routeToAction, setEventsAction } from "actions";

export const deleteEvent: ActionHandler<"DELETE_EVENT"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { eventId } = action;

  try {
    const event = await api.deleteEvent(eventId);
    const events = await api.getEvents();

    dispatch(setEventsAction(events));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
