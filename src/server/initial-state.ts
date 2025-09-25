import { AppContext, AppNext, User, SessionSettings, Event } from "types";
import { getCurrentMinute } from "utils/date";
import { getWindowSize } from "utils/browser";
import { hashToken } from "./utils/crypto";

const DEFAULT_SETTINGS: SessionSettings = {
  theme: "dark",
  timeZone: null,
  language: "ru",
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

async function getEvents(ctx: AppContext): Promise<Event[]> {
  const route = ctx.state.route;

  const isShareRoute =
    route.key === "share_timeline" ||
    route.key === "share_statistics_naps" ||
    route.key === "share_statistics_charts";

  if (isShareRoute) {
    const token = route.token;

    if (!token) {
      return [];
    }

    const tokenHash = hashToken(token);

    const shareLink = await ctx.db.getShareLink(tokenHash);

    if (!shareLink) {
      return [];
    }

    const { userId, startDate } = shareLink;

    const events = await ctx.db.getEvents(userId);

    const startTimestamp = startDate.getTime();

    return events.filter(
      (event) => event.timestamp.getTime() >= startTimestamp
    );
  }

  const user = ctx.state.user;

  if (!user) {
    return [];
  }

  return ctx.db.getEvents(user.id);
}

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route } = ctx.state;

  const user = ctx.state.user;
  const events = await getEvents(ctx);

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
