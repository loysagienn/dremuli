import { AppContext, AppNext, User, SessionSettings, Nap } from "types";
import { getCurrentMinute } from "utils/date";

const DEFAULT_SESSION_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
};

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route, session } = ctx.state;

  const sessionSettings = await ctx.db.getSessionSettings(session.id);

  const user = ctx.state.user;
  let naps: Nap[] = [];

  if (user) {
    naps = await ctx.db.getNaps(user.id);
  }

  let users: User[] = [];

  if (ctx.state.isAdmin) {
    users = await ctx.db.getUsers();
  }

  const firstNap = naps.length > 0 ? naps[0] : null;
  const activeDay = firstNap ? firstNap.endTime || firstNap.startTime : null;

  ctx.state.initialState = {
    router: { route },
    user,
    sessionSettings: sessionSettings ?? DEFAULT_SESSION_SETTINGS,
    naps,
    currentTime: getCurrentMinute(),
    activeDay,
    pageVisibility: true,
    admin: { users },
  };

  return next();
}
