import { AppContext, AppNext, User, SessionSettings, Event } from "types";
import { getCurrentMinute } from "utils/date";

const DEFAULT_SESSION_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
};

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route, session } = ctx.state;

  const sessionSettings = await ctx.db.getSessionSettings(session.id);

  const user = ctx.state.user;
  let events: Event[] = [];

  if (user) {
    events = await ctx.db.getEvents(user.id);
  }

  let users: User[] = [];

  if (ctx.state.isAdmin) {
    users = await ctx.db.getUsers();
  }

  const firstEvent = events.length > 0 ? events[0] : null;
  const activeDay = firstEvent ? firstEvent.timestamp : null;

  ctx.state.initialState = {
    router: { route },
    user,
    sessionSettings: sessionSettings ?? DEFAULT_SESSION_SETTINGS,
    currentTime: getCurrentMinute(),
    activeDay,
    pageVisibility: true,
    admin: { users },
    events,
  };

  return next();
}
