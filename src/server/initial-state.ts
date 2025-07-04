import { AppContext, AppNext, User, UserSettings, Nap } from "types";

const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: "dark",
};

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route, session } = ctx.state;

  const userSettings = await ctx.db.getSessionSettings(session.id);

  let user: User | null = null;
  let naps: Nap[] = [];

  if (session.userId) {
    user = await ctx.db.getUser(session.userId);
    naps = await ctx.db.getNaps(session.userId);
  }

  ctx.state.initialState = {
    router: { route },
    user,
    userSettings: userSettings ?? DEFAULT_USER_SETTINGS,
    naps,
  };

  return next();
}
