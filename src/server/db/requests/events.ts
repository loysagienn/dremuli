import { Event, EventType, EventUpdate } from "types";
import { prisma } from "../client";

export const createEvent =
  () =>
  async (
    userId: string,
    type: EventType,
    timestamp: Date,
    comment?: string | null
  ): Promise<Event> => {
    const { id, createdAt, updatedAt } = await prisma.event.create({
      data: {
        userId,
        type,
        timestamp,
        comment,
      },
    });

    return { id, type, timestamp, createdAt, updatedAt, comment };
  };

export const updateEvent =
  () =>
  async (id: string, update: EventUpdate): Promise<Event> => {
    const { timestamp, type, createdAt, updatedAt, comment } =
      await prisma.event.update({
        where: { id },
        data: update,
      });

    return {
      id,
      timestamp,
      type: type as EventType,
      createdAt,
      updatedAt,
      comment,
    };
  };

export const getEvent =
  () =>
  async (id: string): Promise<Event | null> => {
    const event = await prisma.event.findUnique({ where: { id } });

    if (event) {
      const { id, type, timestamp, createdAt, updatedAt, comment } = event;

      return {
        id,
        type: type as EventType,
        timestamp,
        createdAt,
        updatedAt,
        comment,
      };
    }

    return null;
  };

export const getFullEvent = () => async (id: string) => {
  const event = await prisma.event.findUnique({ where: { id } });

  return event;
};

export const getEvents =
  () =>
  async (userId: string): Promise<Event[]> => {
    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: {
        timestamp: "desc",
      },
    });

    return events.map((event) => {
      const { id, type, timestamp, createdAt, updatedAt, comment } = event;

      return {
        id,
        type: type as EventType,
        timestamp,
        createdAt,
        updatedAt,
        comment,
      };
    });
  };

export const getAllEvents = () => async () => {
  const events = await prisma.event.findMany({
    where: {},
    orderBy: {
      timestamp: "desc",
    },
  });

  return events;
};

export const deleteEvent =
  () =>
  async (id: string): Promise<Event | null> => {
    const event = await prisma.event.delete({ where: { id } });

    if (event) {
      const { id, type, timestamp, createdAt, updatedAt, comment } = event;

      return {
        id,
        type: type as EventType,
        timestamp,
        createdAt,
        updatedAt,
        comment,
      };
    }

    return null;
  };
