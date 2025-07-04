import { AppContext, AppNext } from "types";
import { initApi } from "./api";

export async function apiMiddleware(ctx: AppContext, next: AppNext) {
  ctx.state.api = initApi(ctx);

  return next();
}
