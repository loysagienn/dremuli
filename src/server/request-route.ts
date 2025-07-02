import { router } from "app/router";
import { AppContext, AppNext } from "types";

export async function requestRoute(ctx: AppContext, next: AppNext) {
  ctx.state.route = router.readRoute(ctx.originalUrl);

  return next();
}
