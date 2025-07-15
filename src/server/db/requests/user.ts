import { prisma } from "../client";
import { User, UserCredentials } from "types";

export const getUser =
  () =>
  async (id: string): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  };

export const getUsers = () => async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {},
  });

  return users;
};

export const getUserByEmail =
  () =>
  async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  };

export const createUser =
  () =>
  async (email: string, passwordHash: string): Promise<User> => {
    const user = await prisma.user.create({
      data: {
        email,
        credentials: {
          create: {
            passwordHash,
          },
        },
      },
    });

    return user;
  };

export const getUserPasswordHash = () => async (userId: string) => {
  const userCredentials = await prisma.userCredentials.findUnique({
    where: { userId },
  });

  return userCredentials?.passwordHash ?? null;
};

export const updateUserPasswordHash =
  () => async (userId: string, passwordHash: string) => {
    await prisma.userCredentials.update({
      where: { userId },
      data: { passwordHash },
    });
  };

export const deleteUser =
  () =>
  async (id: string): Promise<User> => {
    return prisma.user.delete({ where: { id } });
  };

export const getPasswordResetToken = () => async (userId: string) => {
  const result = await prisma.passwordResetToken.findUnique({
    where: { userId },
  });

  return result;
};

export const getPasswordResetTokenByHash = () => async (tokenHash: string) => {
  const result = await prisma.passwordResetToken.findFirst({
    where: { tokenHash },
  });

  return result;
};

export const deletePasswordResetToken = () => async (userId: string) => {
  const result = await prisma.passwordResetToken.delete({ where: { userId } });

  return result;
};

export const createPasswordResetToken =
  () => async (userId: string, tokenHash: string) => {
    const currentToken = await getPasswordResetToken()(userId);

    if (currentToken) {
      await deletePasswordResetToken()(userId);
    }
    const result = await prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
      },
    });

    return result;
  };
