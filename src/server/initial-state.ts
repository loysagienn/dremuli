import { AppContext, AppNext, User, SessionSettings, Nap } from "types";

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

  ctx.state.initialState = {
    router: { route },
    user,
    sessionSettings: sessionSettings ?? DEFAULT_SESSION_SETTINGS,
    naps,
  };

  return next();
}
