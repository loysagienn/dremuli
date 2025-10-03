import { Event, EventUpdate, EventType } from "types";

export type CreateEvent = {
  type: "CREATE_EVENT";
  eventType: EventType;
  timestamp: Date;
  comment?: string | null;
};

export function createEventAction(
  eventType: EventType,
  timestamp: Date,
  comment?: string | null
): CreateEvent {
  return {
    type: "CREATE_EVENT",
    eventType,
    timestamp,
    comment,
  };
}

export type SetEvents = {
  type: "SET_EVENTS";
  events: Event[];
};

export function setEventsAction(events: Event[]): SetEvents {
  return {
    type: "SET_EVENTS",
    events,
  };
}

export type UpdateEvent = {
  type: "UPDATE_EVENT";
  eventId: string;
  update: EventUpdate;
};

export function updateEventAction(
  eventId: string,
  update: EventUpdate
): UpdateEvent {
  return {
    type: "UPDATE_EVENT",
    eventId,
    update,
  };
}

export type DeleteEvent = {
  type: "DELETE_EVENT";
  eventId: string;
  confirmed: boolean;
};

export function deleteEventAction(eventId: string): DeleteEvent {
  return {
    type: "DELETE_EVENT",
    eventId,
    confirmed: false,
  };
}
