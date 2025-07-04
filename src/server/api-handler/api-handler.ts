import { AppContext, AppNext, SessionSettings } from "types";
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

  const { theme, timeZone } = data;

  if (!theme || (theme !== "light" && theme !== "dark")) {
    return null;
  }

  return { theme, timeZone: timeZone ?? null };
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

type BodyNap = {
  startTime: Date;
  endTime: Date | null;
};

function getBodyNap(ctx: AppContext): BodyNap | null {
  const data = ctx.request.body?.data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const startTime = parseDate(data.startTime);
  const endTime = parseDate(data.endTime);

  if (startTime === null) {
    return null;
  }

  return { startTime, endTime };
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

export async function apiHandler(ctx: AppContext, next: AppNext) {
  const { route, api } = ctx.state;

  if (route.key === "api_not_found") {
    return notFound(ctx);
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

  if (route.key === "api_login") {
    if (ctx.method === "POST") {
      const userData = getBodyUserRegistration(ctx);

      if (!userData) {
        return badRequest(ctx);
      }

      const { email, password } = userData;

      try {
        const user = await api.login(email, password);

        ctx.body = {
          data: user,
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

  if (route.key === "api_nap") {
    if (ctx.method === "POST") {
      const { napId } = route;
      const update = getBodyNap(ctx);

      const nap = await api.updateNap(napId, update);

      ctx.body = {
        data: nap,
      };

      return;
    }
  }

  if (route.key === "api_naps") {
    if (ctx.method === "POST") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const napCreate = getBodyNap(ctx);

      if (!napCreate) {
        return badRequest(ctx);
      }

      const { startTime, endTime } = napCreate;

      const nap = await api.createNap(startTime, endTime);

      ctx.body = {
        data: nap,
      };

      return;
    }

    if (ctx.method === "GET") {
      const { userId } = ctx.state.session;

      if (!userId) {
        return unauthorized(ctx);
      }

      const naps = await api.getNaps();

      ctx.body = {
        data: naps,
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
