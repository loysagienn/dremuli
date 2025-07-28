import { prisma } from "../client";
import { UserSettings, Lang } from "types";

export const getUserSettings =
  () =>
  async (userId: string): Promise<UserSettings | null> => {
    const userSettings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!userSettings) {
      return null;
    }

    const { language } = userSettings;

    return { language: language as Lang };
  };

export const setUserSettings =
  () =>
  async (userId: string, userSettings: UserSettings): Promise<UserSettings> => {
    const { language } = await prisma.userSettings.upsert({
      where: { userId },
      update: userSettings,
      create: {
        userId,
        ...userSettings,
      },
    });

    return { language: language as Lang };
  };

export const deleteUserSettings = () => async (userId: string) => {
  return prisma.userSettings.delete({ where: { userId } });
};
