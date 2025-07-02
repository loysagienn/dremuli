import { AppContext, AppNext, User, UserSettings } from "types";
import { hashToken } from "server/utils/crypto";
import { router } from "app/router";

const HOUR_MS = 60 * 60 * 1000;

export async function resetPassword(ctx: AppContext, next: AppNext) {
  const { route } = ctx.state;

  if (route.key !== "reset_password" || !route.token) {
    return next();
  }

  const tokenHash = hashToken(route.token);

  const reset = await ctx.db.getPasswordResetTokenByHash(tokenHash);

  if (!reset) {
    ctx.redirect(router.writeRoute({ key: "reset_password", token: null }));

    return;
  }

  const diffMs = Date.now() - reset.issuedAt.getTime();

  if (diffMs > HOUR_MS) {
    await ctx.db.deletePasswordResetToken(reset.userId);

    ctx.redirect(router.writeRoute({ key: "reset_password", token: null }));

    return;
  }

  return next();
}
