import { prisma } from "../client";
import { Session } from "types";

export const getSession = () => async (id: string) => {
  const session = await prisma.session.findUnique({ where: { id } });

  return session;
};

type SessionData = Pick<Session, "userAgent" | "csrfToken">;

export const createSession = () => async (data: SessionData) => {
  return prisma.session.create({
    data,
  });
};

export const updateSession = () => async (id: string, data: SessionData) => {
  return prisma.session.update({
    where: { id },
    data,
  });
};

export const deleteSession = () => async (id: string) => {
  return prisma.session.delete({ where: { id } });
};

export const linkUserToSession =
  () => async (sessionId: string, userId: string) => {
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        userId,
      },
    });
  };

export const logoutUser = () => async (sessionId: string) => {
  await prisma.session.update({
    where: { id: sessionId },
    data: {
      userId: null,
    },
  });
};
