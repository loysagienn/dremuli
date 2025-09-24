import { AppContext, AppNext, User, SessionSettings, Event } from "types";
import { getCurrentMinute } from "utils/date";
import { getWindowSize } from "utils/browser";

const DEFAULT_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
  language: "en",
};

async function getSettings(ctx: AppContext): Promise<SessionSettings> {
  const { userSettings, sessionSettings } = ctx.state;

  const theme = sessionSettings?.theme ?? DEFAULT_SETTINGS.theme;
  const timeZone = sessionSettings?.timeZone ?? DEFAULT_SETTINGS.timeZone;
  const language =
    userSettings?.language ??
    sessionSettings?.language ??
    DEFAULT_SETTINGS.language;

  return { theme, timeZone, language };
}

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route } = ctx.state;

  const user = ctx.state.user;
  let events: Event[] = [];

  if (user) {
    events = await ctx.db.getEvents(user.id);
  }

  let users: User[] = [];

  if (ctx.state.isAdmin) {
    users = await ctx.db.getUsers();
  }

  const settings = await getSettings(ctx);

  const firstEvent = events.length > 0 ? events[0] : null;
  const activeDay = firstEvent ? firstEvent.timestamp : null;

  const currentTime = getCurrentMinute();
  const currentDate = new Date(currentTime);
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  ctx.state.initialState = {
    router: { route },
    user,
    settings,
    currentTime: { time: currentTime, date: currentDate },
    activeDay,
    pageVisibility: true,
    admin: { users },
    events,
    windowSize: getWindowSize(),
    exportToJson: {
      visible: false,
    },
    importFromJson: {
      visible: false,
      readingFile: false,
      creatingEvents: false,
      errorMessage: null,
    },
    share: {
      modalOpened: false,
      shareLink: null,
    },
    confirmAction: null,
  };

  return next();
}
