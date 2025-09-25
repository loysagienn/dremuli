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

async function getEvents(ctx: AppContext): Promise<[Event[], string | null]> {
  const route = ctx.state.route;

  const isShareRoute =
    route.key === "share_timeline" ||
    route.key === "share_statistics_naps" ||
    route.key === "share_statistics_charts";

  if (isShareRoute) {
    const token = route.token;

    if (!token) {
      return [[], null];
    }

    const tokenHash = hashToken(token);

    const shareLink = await ctx.db.getShareLink(tokenHash);

    if (!shareLink) {
      return [[], null];
    }

    const { userId, startDate, timeZone } = shareLink;

    const events = await ctx.db.getEvents(userId);

    const startTimestamp = startDate.getTime();

    const filteredEvents = events.filter(
      (event) => event.timestamp.getTime() >= startTimestamp
    );

    return [filteredEvents, timeZone];
  }

  const user = ctx.state.user;

  if (!user) {
    return [[], null];
  }

  return [await ctx.db.getEvents(user.id), null];
}

export async function initialState(ctx: AppContext, next: AppNext) {
  const { route } = ctx.state;

  const user = ctx.state.user;
  const [events, eventsTimeZone] = await getEvents(ctx);

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
    activeTimezone: eventsTimeZone ?? settings.timeZone ?? null,
    // activeTimezone: "Europe/Berlin",
    // activeTimezone: "America/Los_Angeles",
    // activeTimezone: "Asia/Jerusalem",
  };

  return next();
}
