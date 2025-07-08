import { AppContext, AppNext, User, SessionSettings, Nap } from "types";
import { getCurrentMinute } from "utils/date";

const DEFAULT_SESSION_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
};

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route, session } = ctx.state;

  const sessionSettings = await ctx.db.getSessionSettings(session.id);

  let user: User | null = null;
  let naps: Nap[] = [];

  if (session.userId) {
    user = await ctx.db.getUser(session.userId);
    naps = await ctx.db.getNaps(session.userId);
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
  };

  return next();
}
