import { Nap, NapUpdate } from "types";
import { prisma } from "../client";

export const createNap =
  () =>
  async (
    userId: string,
    startTime: Date,
    endTime: Date | null = null
  ): Promise<Nap> => {
    const { id, createdAt, updatedAt } = await prisma.sleepSession.create({
      data: {
        userId,
        startTime,
        endTime,
      },
    });

    return { id, startTime, endTime, createdAt, updatedAt };
  };

export const updateNap =
  () =>
  async (id: string, update: NapUpdate): Promise<Nap> => {
    const { startTime, endTime, createdAt, updatedAt } =
      await prisma.sleepSession.update({
        where: { id },
        data: update,
      });

    return { id, startTime, endTime, createdAt, updatedAt };
  };

export const getNap =
  () =>
  async (id: string): Promise<Nap | null> => {
    const nap = await prisma.sleepSession.findUnique({ where: { id } });

    if (nap) {
      const { id, startTime, endTime, createdAt, updatedAt } = nap;

      return { id, startTime, endTime, createdAt, updatedAt };
    }

    return null;
  };

export const getFullNap = () => async (id: string) => {
  const nap = await prisma.sleepSession.findUnique({ where: { id } });

  return nap;
};

export const getNaps =
  () =>
  async (userId: string): Promise<Nap[]> => {
    const naps = await prisma.sleepSession.findMany({
      where: { userId },
      orderBy: {
        startTime: "desc",
      },
    });

    return naps.map((nap) => {
      const { id, startTime, endTime, createdAt, updatedAt } = nap;

      return { id, startTime, endTime, createdAt, updatedAt };
    });
  };

export const getAllNaps = () => async (): Promise<Nap[]> => {
  const naps = await prisma.sleepSession.findMany({
    where: {},
    orderBy: {
      startTime: "desc",
    },
  });

  return naps.map((nap) => {
    const { id, startTime, endTime, createdAt, updatedAt } = nap;

    return { id, startTime, endTime, createdAt, updatedAt };
  });
};

export const deleteNap =
  () =>
  async (id: string): Promise<Nap | null> => {
    const nap = await prisma.sleepSession.delete({ where: { id } });

    if (nap) {
      const { id, startTime, endTime, createdAt, updatedAt } = nap;

      return { id, startTime, endTime, createdAt, updatedAt };
    }

    return null;
  };
