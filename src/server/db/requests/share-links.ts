import { ShareLink } from "types";
import { prisma } from "../client";

export const createShareLink =
  () =>
  async (
    userId: string,
    tokenHash: string,
    startDate: Date,
    timeZone: string
  ): Promise<ShareLink> => {
    const link = await prisma.shareLink.create({
      data: {
        userId,
        tokenHash,
        startDate,
        timeZone,
      },
    });

    return link;
  };

export const getShareLink =
  () =>
  async (tokenHash: string): Promise<ShareLink | null> => {
    const link = await prisma.shareLink.findUnique({ where: { tokenHash } });

    return link;
  };

export const deleteShareLink = () => async (id: string) => {
  await prisma.shareLink.delete({ where: { id } });
};

export const getUserShareLinks =
  () =>
  async (userId: string): Promise<ShareLink[]> => {
    const links = await prisma.shareLink.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return links;
  };
