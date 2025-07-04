import { prisma } from "../client";
import { Session, SessionSettings } from "types";

export const getSessionSettings =
  () =>
  async (id: string): Promise<SessionSettings | null> => {
    const settings = await prisma.sessionSettings.findUnique({ where: { id } });

    if (!settings) {
      return null;
    }

    const { theme, timeZone } = settings;

    return { theme, timeZone };
  };

export const setSessionSettings =
  () =>
  async (id: string, settings: SessionSettings): Promise<SessionSettings> => {
    const { theme, timeZone } = await prisma.sessionSettings.upsert({
      where: { id },
      update: settings,
      create: {
        id,
        ...settings,
      },
    });

    return { theme, timeZone };
  };

export const deleteSessionSettings = () => async (id: string) => {
  return prisma.sessionSettings.delete({ where: { id } });
};
