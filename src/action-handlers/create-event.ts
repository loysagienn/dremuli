import { ActionHandler } from "types";
import { routeToAction, setEventsAction } from "actions";

export const cerateEvent: ActionHandler<"CREATE_EVENT"> = async ({
  action,
  dispatch,
  api,
  next,
}) => {
  next(action);

  const { eventType, timestamp, comment } = action;

  try {
    const event = await api.createEvent(eventType, timestamp, comment);
    const events = await api.getEvents();

    dispatch(setEventsAction(events));
    dispatch(routeToAction({ key: "home" }));
  } catch (error) {
    console.error(error);
  }
};
