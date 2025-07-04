import { AppContext, User } from "types";
import { UserSettings, Api } from "types";
import {
  hashPassword,
  comparePassword,
  getToken,
  hashToken,
} from "server/utils/crypto";
import { sendEmailBackground } from "server/utils/send-email";
import { router } from "app/router";
import { DOMAIN } from "config";

const setUserSettingsFactory =
  (ctx: AppContext) => async (settings: UserSettings) => {
    const { session } = ctx.state;

    return ctx.db.setSessionSettings(session.id, settings);
  };

const getUserSettingsFactory = (ctx: AppContext) => async () => {
  const { session } = ctx.state;

  return ctx.db.getSessionSettings(session.id);
};

const registerUserFactory =
  (ctx: AppContext) =>
  async (email: string, password: string): Promise<User> => {
    const passwordHash = await hashPassword(password);

    const user = await ctx.db.createUser(email, passwordHash);

    await ctx.db.linkUserToSession(ctx.state.session.id, user.id);

    return user;
  };

const loginFactory =
  (ctx: AppContext) =>
  async (email: string, password: string): Promise<User> => {
    const user = await ctx.db.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordHash = await ctx.db.getUserPasswordHash(user.id);

    const passwordIsValid = await comparePassword(password, passwordHash);

    if (!passwordIsValid) {
      throw new Error("Password issue");
    }

    await ctx.db.linkUserToSession(ctx.state.session.id, user.id);

    sendEmailBackground({
      to: email,
      subject: "Dremuli: new login",
      content: "Hello, there is a new login to your account",
    });

    return user;
  };

const chnagePasswordFactory =
  (ctx: AppContext) =>
  async (password: string, newPassword: string): Promise<void> => {
    const { userId } = ctx.state.session;

    if (!userId) {
      throw new Error("No user in session");
    }

    const currentPasswordHash = await ctx.db.getUserPasswordHash(userId);

    const passwordIsValid = await comparePassword(
      password,
      currentPasswordHash
    );

    if (!passwordIsValid) {
      throw new Error("Password is not valid");
    }

    const newPasswordHash = await hashPassword(newPassword);

    await ctx.db.updateUserPasswordHash(userId, newPasswordHash);
  };

const forgetPasswordFactory = (ctx: AppContext) => async (email: string) => {
  const user = await ctx.db.getUserByEmail(email);

  if (!user) {
    return;
  }

  const token = getToken();
  const tokenHash = hashToken(token);

  await ctx.db.createPasswordResetToken(user.id, tokenHash);

  sendEmailBackground({
    to: email,
    subject: "Dremuli: reset password",
    content: `Follow this link to reset password: https://${DOMAIN}${router.writeRoute(
      { key: "reset_password", token }
    )}`,
  });
};

const resetPasswordFactory =
  (ctx: AppContext) => async (password: string, token: string) => {
    const tokenHash = hashToken(token);

    const reset = await ctx.db.getPasswordResetTokenByHash(tokenHash);

    if (!reset) {
      throw new Error("Invalid token");
    }

    await ctx.db.deletePasswordResetToken(reset.userId);

    const diffMs = Date.now() - reset.issuedAt.getTime();

    if (diffMs > 70 * 60 * 1000) {
      throw new Error("Token has expired");
    }

    const passwordHash = await hashPassword(password);

    await ctx.db.updateUserPasswordHash(reset.userId, passwordHash);
  };

const createNapFactory =
  (ctx: AppContext) => async (startTime: Date, endTime?: Date | null) => {
    const { userId } = ctx.state.session;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const nap = await ctx.db.createNap(userId, startTime, endTime);

    return nap;
  };

const getNapsFactory = (ctx: AppContext) => async () => {
  const { userId } = ctx.state.session;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const naps = await ctx.db.getNaps(userId);

  return naps;
};

export function initApi(ctx: AppContext): Api {
  const setUserSettings = setUserSettingsFactory(ctx);
  const getUserSettings = getUserSettingsFactory(ctx);
  const registerUser = registerUserFactory(ctx);
  const login = loginFactory(ctx);
  const changePassword = chnagePasswordFactory(ctx);
  const forgetPassword = forgetPasswordFactory(ctx);
  const resetPassword = resetPasswordFactory(ctx);
  const createNap = createNapFactory(ctx);
  const getNaps = getNapsFactory(ctx);

  return {
    setUserSettings,
    getUserSettings,
    registerUser,
    login,
    changePassword,
    forgetPassword,
    resetPassword,
    createNap,
    getNaps,
  };
}
