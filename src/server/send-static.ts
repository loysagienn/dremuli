import { resolve } from "path";
import send from "koa-send";
import { AppContext, AppNext } from "types";

function notFound(ctx: AppContext) {
  ctx.body = "File not found";
  ctx.status = 404;
}

export const ERROR_CODES = {
  ENOENT: "ENOENT",
};

const rootDir = process.env.PWD;

export async function sendStatic(ctx: AppContext, next: AppNext) {
  if (!ctx.path.startsWith("/static/") && !ctx.path.startsWith("/favicon")) {
    return next();
  }

  if (!rootDir) {
    throw new Error("No root dir");
  }

  const staticPath = ctx.path.slice(8);

  if (!staticPath) {
    return notFound(ctx);
  }

  const root = resolve(rootDir, "public");

  try {
    if (
      process.env.NODE_ENV === "production" &&
      ctx.query.v === __APP_VERSION__ &&
      staticPath.startsWith("bundle/")
    ) {
      ctx.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return await send(ctx, staticPath, { root });
  } catch (error) {
    if (error.code === ERROR_CODES.ENOENT) {
      notFound(ctx);
    } else {
      throw error;
    }
  }
}
