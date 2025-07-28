import { prisma } from "../client";
import { Lang, SessionSettings } from "types";

export const getSessionSettings =
  () =>
  async (id: string): Promise<SessionSettings | null> => {
    const settings = await prisma.sessionSettings.findUnique({ where: { id } });

    if (!settings) {
      return null;
    }

    const { theme, timeZone, language } = settings;

    return { theme, timeZone, language: language as Lang };
  };

export const setSessionSettings =
  () =>
  async (id: string, settings: SessionSettings): Promise<SessionSettings> => {
    const { theme, timeZone, language } = await prisma.sessionSettings.upsert({
      where: { id },
      update: settings,
      create: {
        id,
        ...settings,
      },
    });

    return { theme, timeZone, language: language as Lang };
  };

export const deleteSessionSettings = () => async (id: string) => {
  return prisma.sessionSettings.delete({ where: { id } });
};
