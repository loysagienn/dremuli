import { AppContext, AppNext } from "types";
import { DOMAIN } from "config";

export async function processCors(ctx: AppContext, next: AppNext) {
  ctx.set(
    "Access-Control-Allow-Origin",
    DOMAIN === "localhost" ? "*" : `https://${DOMAIN}`
  );
  ctx.set("Access-Control-Allow-Credentials", "true");

  return next();
}
