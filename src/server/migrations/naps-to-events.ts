import { EventType } from "types";
import { DbApi, getDbApi } from "../db";
import { Event } from "../db/prisma/client";

async function addEvent(
  db: DbApi,
  events: Event[],
  userId: string,
  type: EventType,
  timestamp: Date
) {
  const existingEvent = events.find(
    (event) =>
      event.userId === userId &&
      event.type === type &&
      event.timestamp.getTime() === timestamp.getTime()
  );

  if (existingEvent) {
    console.log("skip event", userId, type, timestamp);

    return;
  }

  await db.createEvent(userId, type, timestamp);

  console.log("add event", userId, type, timestamp);
}

async function napsToEvents() {
  console.log("Sync naps to events");

  const db = await getDbApi();

  const allNaps = await db.getAllNaps();
  const events = await db.getAllEvents();

  const naps = allNaps.slice().reverse();

  for (let i = 0; i < naps.length; i++) {
    const { startTime, endTime, userId } = naps[i];

    await addEvent(db, events, userId, "fell_asleep", startTime);

    if (endTime) {
      await addEvent(db, events, userId, "woke_up", endTime);
    }
  }
}

napsToEvents();
