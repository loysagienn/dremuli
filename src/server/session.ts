import { SESSION_ID_COOKIE_NAME, DOMAIN } from "config";
import type { Session, AppContext, AppNext } from "types";
import { getToken } from "server/utils/crypto";

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365; // 1 year

const getSession = async (ctx: AppContext): Promise<Session> => {
  const { cookies } = ctx;

  const sessionId = cookies.get(SESSION_ID_COOKIE_NAME);

  if (sessionId) {
    let session = await ctx.db.getSession(sessionId);

    if (session) {
      if (!session.csrfToken) {
        session = await ctx.db.updateSession(session.id, {
          userAgent: session.userAgent,
          csrfToken: getToken(),
        });
      }

      return session;
    }
  }

  const session = await ctx.db.createSession({
    userAgent: ctx.headers["user-agent"] || "",
    csrfToken: getToken(),
  });

  cookies.set(SESSION_ID_COOKIE_NAME, session.id, {
    domain: DOMAIN,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "none",
  });

  return session;
};

export const session = async (ctx: AppContext, next: AppNext) => {
  const session = await getSession(ctx);

  ctx.state.session = session;

  return next();
};
