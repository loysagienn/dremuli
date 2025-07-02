import { prisma } from "../client";
import { Session, UserSettings } from "types";

export const getSessionSettings =
  () =>
  async (id: string): Promise<UserSettings | null> => {
    const settings = await prisma.sessionSettings.findUnique({ where: { id } });

    if (!settings) {
      return null;
    }

    const { theme } = settings;

    return { theme };
  };

export const setSessionSettings =
  () =>
  async (id: string, settings: UserSettings): Promise<UserSettings> => {
    const { theme } = await prisma.sessionSettings.upsert({
      where: { id },
      update: settings,
      create: {
        id,
        ...settings,
      },
    });

    return { theme };
  };

export const deleteSessionSettings = () => async (id: string) => {
  return prisma.sessionSettings.delete({ where: { id } });
};
