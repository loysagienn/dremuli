import { AppContext, AppNext, UserSettings } from "types";
import { ADMIN_USER_EMAILS } from "config";

const DEFAULT_USER_SETTINGS: UserSettings = {
  language: "en",
};

export async function processUser(ctx: AppContext, next: AppNext) {
  const { session } = ctx.state;

  if (session.userId) {
    const [user, userSettings] = await Promise.all([
      ctx.db.getUser(session.userId),
      ctx.db.getUserSettings(session.userId),
    ]);

    if (user) {
      ctx.state.user = user;
      ctx.state.userSettings = userSettings || DEFAULT_USER_SETTINGS;
      ctx.state.isAdmin = ADMIN_USER_EMAILS.includes(user.email);

      return next();
    }
  }

  ctx.state.user = null;
  ctx.state.userSettings = null;
  ctx.state.isAdmin = false;

  return next();
}
