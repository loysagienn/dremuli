import { AppRouteKey } from "app/router";
import {
  AppContext,
  AppNext,
  BatchEventData,
  EventType,
  SessionSettings,
  UserSettings,
} from "types";
import { parseDate } from "utils/parse-date";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function getBodySessionSettings(ctx: AppContext): SessionSettings | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const { theme, timeZone, language } = data;

  if (!theme || (theme !== "light" && theme !== "dark")) {
    return null;
  }

  if (!language) {
    return null;
  }

  return { theme, language, timeZone: timeZone ?? null };
}

function getBodyUserSettings(ctx: AppContext): UserSettings | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const { language } = data;

  if (!language) {
    return null;
  }

  return { language };
}

type BodyChangePassword = {
  password: string;
  newPassword: string;
};

function getBodyChangePassword(ctx: AppContext): BodyChangePassword | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.password || typeof data.password !== "string") {
    return null;
  }

  if (!data.newPassword || typeof data.newPassword !== "string") {
    return null;
  }

  return data;
}

function getBatchEventData(ctx: AppContext): BatchEventData[] | null {
  const data = ctx.request.body?.data;

  if (!Array.isArray(data)) {
    return null;
  }

  const eventsData: BatchEventData[] = [];

  for (let i = 0; i < data.length; i++) {
    const eventData = data[i];
    const type = eventData.type;

    if (type !== EventType.WokeUp && type !== EventType.FellAsleep) {
      return null;
    }

    const timestamp = parseDate(eventData.timestamp);

    if (timestamp === null) {
      return null;
    }

    const comment = eventData.comment;

    eventsData.push({ type, timestamp, comment });
  }

  return eventsData;
}

type BodyEventCreate = {
  type: EventType;
  timestamp: Date;
  comment?: string | null;
};

function getBodyEventCreate(ctx: AppContext): BodyEventCreate | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const type = data.type;

  if (type !== EventType.WokeUp && type !== EventType.FellAsleep) {
    return null;
  }

  const timestamp = parseDate(data.timestamp);

  if (timestamp === null) {
    return null;
  }

  const comment = data.comment;

  return { type, timestamp, comment };
}

type BodyEventUpdate = {
  timestamp: Date;
  comment?: string | null;
};

function getBodyEventUpdate(ctx: AppContext): BodyEventUpdate | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const timestamp = parseDate(data.timestamp);

  if (timestamp === null) {
    return null;
  }

  const comment = data.comment;

  return { timestamp, comment };
}

type BodyShareLink = {
  startDate: Date;
  timeZone: string;
};

function getBodyShareLink(ctx: AppContext): BodyShareLink | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.startDate || !data.timeZone) {
    return null;
  }

  const startDate = parseDate(data.startDate);

  if (startDate === null) {
    return null;
  }

  return { startDate, timeZone: data.timeZone };
}

type BodyResetPassword = {
  password: string;
  token: string;
};

function getBodyResetPassword(ctx: AppContext): BodyResetPassword | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.password || typeof data.password !== "string") {
    return null;
  }

  if (!data.token || typeof data.token !== "string") {
    return null;
  }

  return data;
}

type UserRegistration = {
  email: string;
  password: string;
};

function getBodyUserRegistration(ctx: AppContext): UserRegistration | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.email || typeof data.email !== "string") {
    return null;
  }

  if (!data.password || typeof data.password !== "string") {
    return null;
  }

  return data;
}

function getEmail(ctx: AppContext): string | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  if (!data.email || typeof data.email !== "string") {
    return null;
  }

  return data.email;
}

function notFound(ctx: AppContext) {
  ctx.body = {
    error: "not_found",
    message: "Not found",
  };

  ctx.status = 404;
}

function badRequest(ctx: AppContext) {
  ctx.body = {
    error: "bad_request",
    message: "Bad request",
  };

  ctx.status = 400;
}

function unauthorized(ctx: AppContext) {
  ctx.body = {
    error: "unauthorized",
    message: "Unauthorized",
  };

  ctx.status = 401;
}

const authorizedRequests: AppRouteKey[] = [
  "api_change_password",
  "api_event",
  "api_events",
  "api_events_batch",
  "api_forget_password",
  "api_login",
  "api_register_user",
  "api_reset_password",
  "api_settings",
  "api_user_settings",
];

export async function apiHandler(ctx: AppContext, next: AppNext) {
  const { route, api } = ctx.state;

  if (route.key === "api_not_found") {
    return notFound(ctx);
  }

  if (route.key === "api_csrf_token") {
    if (ctx.method === "GET") {
      ctx.body = {
        token: ctx.state.session.csrfToken,
      };

      return;
    }
  }

  if (authorizedRequests.includes(route.key)) {
    const csrfToken = ctx.headers["x-csrf-token"];

    if (csrfToken !== ctx.state.session.csrfToken) {
      return unauthorized(ctx);
    }
  }

  if (route.key === "api_settings") {
    if (ctx.method === "GET") {
      const sessionSettings = await api.getSessionSettings();

      ctx.body = {
        data: sessionSettings,
      };

      return;
    }

    if (ctx.method === "POST") {
      const bodySessionSettings = getBodySessionSettings(ctx);

      if (!bodySessionSettings) {
        return badRequest(ctx);
      }

      const sessionSettings = await api.setSessionSettings(bodySessionSettings);

      ctx.body = {
        data: sessionSettings,
      };

      return;
    }
  }

  if (route.key === "api_user_settings") {
    if (ctx.method === "GET") {
      const userSettings = await api.getUserSettings();

      ctx.body = {
        data: userSettings,
      };

      return;
    }

    if (ctx.method === "POST") {
      const bodyUserSettings = getBodyUserSettings(ctx);

      if (!bodyUserSettings) {
        return badRequest(ctx);
      }

      const userSettings = await api.setUserSettings(bodyUserSettings);

      ctx.body = {
        data: userSettings,
      };

      return;
    }
  }

  if (route.key === "api_login") {
    if (ctx.method === "POST") {
      const userData = getBodyUserRegistration(ctx);

      if (!userData) {
        return badRequest(ctx);
      }

      const { email, password } = userData;

      try {
        const { user, userSettings } = await api.login(email, password);

        ctx.body = {
          data: { user, userSettings },
        };

        return;
      } catch (error) {
        ctx.body = {
          error: "login_failed",
          message: "Login failed",
        };

        ctx.status = 400;

        return;
      }
    }
  }

  if (route.key === "logout") {
    if (ctx.method === "GET") {
      await ctx.db.logoutUser(ctx.state.session.id);

      ctx.redirect("/");

      return;
    }
  }

  if (route.key === "api_change_password") {
    if (ctx.method === "POST") {
      const data = getBodyChangePassword(ctx);

      if (!data) {
        return badRequest(ctx);
      }

      const { password, newPassword } = data;

      try {
        await api.changePassword(password, newPassword);

        ctx.body = {
          data: {},
        };

        return;
      } catch (error) {
        console.error("error", error);

        return badRequest(ctx);
      }
    }
  }

  if (route.key === "api_forget_password") {
    if (ctx.method === "POST") {
      const email = getEmail(ctx);

      if (!email) {
        return badRequest(ctx);
      }

      await api.forgetPassword(email);

      ctx.body = {
        data: {},
      };

      return;
    }
  }

  if (route.key === "api_reset_password") {
    if (ctx.method === "POST") {
      const data = getBodyResetPassword(ctx);

      if (!data) {
        return badRequest(ctx);
      }

      const { password, token } = data;

      await api.resetPassword(password, token);

      ctx.body = {
        data: {},
      };

      return;
    }
  }

  if (route.key === "api_event") {
    if (ctx.method === "POST") {
      const { eventId } = route;
      const update = getBodyEventUpdate(ctx);

      const event = await api.updateEvent(eventId, update);

      ctx.body = {
        data: event,
      };

      return;
    }

    if (ctx.method === "DELETE") {
      const { eventId } = route;

      const event = await api.deleteEvent(eventId);

      ctx.body = {
        data: event,
      };

      return;
    }
  }

  if (route.key === "api_events_batch") {
    if (ctx.method === "POST") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const batchEventsData = getBatchEventData(ctx);

      if (!batchEventsData) {
        return badRequest(ctx);
      }

      const events = await api.createEventsBatch(batchEventsData);

      ctx.body = {
        data: events,
      };

      return;
    }
  }

  if (route.key === "api_events") {
    if (ctx.method === "POST") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const eventCreate = getBodyEventCreate(ctx);

      if (!eventCreate) {
        return badRequest(ctx);
      }

      const { type, timestamp, comment } = eventCreate;

      const event = await api.createEvent(type, timestamp, comment);

      ctx.body = {
        data: event,
      };

      return;
    }

    if (ctx.method === "GET") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const events = await api.getEvents();

      ctx.body = {
        data: events,
      };

      return;
    }
  }

  if (route.key === "api_share_link") {
    if (ctx.method === "POST") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const bodyShareLink = getBodyShareLink(ctx);

      if (!bodyShareLink) {
        return badRequest(ctx);
      }

      const { startDate, timeZone } = bodyShareLink;

      const shareLink = await api.createShareLink(startDate, timeZone);

      ctx.body = {
        data: shareLink,
      };

      return;
    }
  }

  if (route.key === "api_register_user") {
    if (ctx.method === "POST") {
      const userRegistration = getBodyUserRegistration(ctx);

      if (!userRegistration) {
        return badRequest(ctx);
      }

      const { email, password } = userRegistration;

      if (!isValidEmail(email)) {
        ctx.body = {
          error: "email_is_not_valid",
          message: "Email is not valid",
        };

        ctx.status = 400;

        return;
      }

      if (password.length < 6) {
        ctx.body = {
          error: "password_too_short",
          message: "Password is too short, minimum us 6 characters",
        };

        ctx.status = 400;

        return;
      }

      const existingUser = await ctx.db.getUserByEmail(email);

      if (existingUser) {
        ctx.body = {
          error: "email_already_in_use",
          message: "Email already in use",
        };

        ctx.status = 409;

        return;
      }

      const user = await api.registerUser(email, password);

      ctx.body = {
        data: user,
      };

      return;
    }
  }

  return next();
}
