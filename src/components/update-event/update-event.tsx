import React from "react";
import { useSelector } from "react-redux";
import { selectRouteEvent } from "selectors";
import { UpdateEventForm } from "./update-event-form";

export function UpdateEvent() {
  const event = useSelector(selectRouteEvent);

  if (!event) {
    return null;
  }

  return <UpdateEventForm event={event} />;
}
