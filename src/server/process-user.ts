import { AppContext, AppNext, User, SessionSettings, Nap } from "types";
import { getCurrentMinute } from "utils/date";
import { ADMIN_USER_EMAILS } from "config";

const DEFAULT_SESSION_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
};

export async function processUser(ctx: AppContext, next: AppNext) {
  const { session } = ctx.state;

  if (session.userId) {
    const user = await ctx.db.getUser(session.userId);

    if (user) {
      ctx.state.user = user;
      ctx.state.isAdmin = ADMIN_USER_EMAILS.includes(user.email);

      return next();
    }
  }

  ctx.state.user = null;
  ctx.state.isAdmin = false;

  return next();
}
