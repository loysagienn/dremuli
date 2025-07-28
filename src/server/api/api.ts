import { AppContext, EventType, EventUpdate, User } from "types";
import { SessionSettings, UserSettings, Api } from "types";
import {
  hashPassword,
  comparePassword,
  getToken,
  hashToken,
} from "server/utils/crypto";
import { sendEmailBackground } from "server/utils/send-email";
import { router } from "app/router";
import { DOMAIN } from "config";

const setSessionSettingsFactory =
  (ctx: AppContext) => async (settings: SessionSettings) => {
    const { session } = ctx.state;

    return ctx.db.setSessionSettings(session.id, settings);
  };

const getSessionSettingsFactory = (ctx: AppContext) => async () => {
  const { session } = ctx.state;

  return ctx.db.getSessionSettings(session.id);
};

const setUserSettingsFactory =
  (ctx: AppContext) => async (userSettings: UserSettings) => {
    const { user } = ctx.state;

    if (user) {
      return ctx.db.setUserSettings(user.id, userSettings);
    }

    throw new Error("No user");
  };

const getUserSettingsFactory = (ctx: AppContext) => async () => {
  const { user } = ctx.state;

  if (user) {
    return ctx.db.getUserSettings(user.id);
  }

  return null;
};

const registerUserFactory =
  (ctx: AppContext) =>
  async (email: string, password: string): Promise<User> => {
    const { session } = ctx.state;
    const passwordHash = await hashPassword(password);

    const user = await ctx.db.createUser(email, passwordHash);

    await ctx.db.linkUserToSession(ctx.state.session.id, user.id);

    const sessionSettings = await ctx.db.getSessionSettings(
      ctx.state.session.id
    );

    const language = sessionSettings?.language ?? "en";

    await ctx.db.setUserSettings(user.id, { language });

    return user;
  };

const loginFactory =
  (ctx: AppContext) =>
  async (
    email: string,
    password: string
  ): Promise<{ user: User; userSettings: UserSettings }> => {
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

    let userSettings = await ctx.db.getUserSettings(user.id);

    if (!userSettings) {
      userSettings = { language: "en" };
    }

    sendEmailBackground({
      to: email,
      subject: "Dremuli: new login",
      content: "Hello, there is a new login to your account",
    });

    return { user, userSettings };
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

const createEventFactory =
  (ctx: AppContext) => async (type: EventType, timestamp: Date) => {
    const { userId } = ctx.state.session;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const event = await ctx.db.createEvent(userId, type, timestamp);

    return event;
  };

const deleteEventFactory = (ctx: AppContext) => async (eventId: string) => {
  const { userId } = ctx.state.session;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const fullEvent = await ctx.db.getFullEvent(eventId);

  if (!fullEvent) {
    throw new Error("Event not found");
  }

  if (fullEvent.userId !== userId) {
    throw new Error("Access denied");
  }

  const event = await ctx.db.deleteEvent(eventId);

  return event;
};

const updateEventFactory =
  (ctx: AppContext) => async (eventId: string, update: EventUpdate) => {
    const { userId } = ctx.state.session;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const fullEvent = await ctx.db.getFullEvent(eventId);

    if (!fullEvent) {
      throw new Error("Event not found");
    }

    if (fullEvent.userId !== userId) {
      throw new Error("Access denied");
    }

    const event = await ctx.db.updateEvent(eventId, update);

    return event;
  };

const getEventsFactory = (ctx: AppContext) => async () => {
  const { userId } = ctx.state.session;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const events = await ctx.db.getEvents(userId);

  return events;
};

export function initApi(ctx: AppContext): Api {
  const setSessionSettings = setSessionSettingsFactory(ctx);
  const getSessionSettings = getSessionSettingsFactory(ctx);
  const getUserSettings = getUserSettingsFactory(ctx);
  const setUserSettings = setUserSettingsFactory(ctx);
  const registerUser = registerUserFactory(ctx);
  const login = loginFactory(ctx);
  const changePassword = chnagePasswordFactory(ctx);
  const forgetPassword = forgetPasswordFactory(ctx);
  const resetPassword = resetPasswordFactory(ctx);
  const createEvent = createEventFactory(ctx);
  const getEvents = getEventsFactory(ctx);
  const updateEvent = updateEventFactory(ctx);
  const deleteEvent = deleteEventFactory(ctx);

  return {
    setSessionSettings,
    getSessionSettings,
    getUserSettings,
    setUserSettings,
    registerUser,
    login,
    changePassword,
    forgetPassword,
    resetPassword,
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
  };
}
