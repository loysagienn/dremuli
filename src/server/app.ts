import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { sendStatic } from "./send-static";
import { renderHtml } from "./render-html";
import { HTTP_PORT } from "config";
import { getDbApi } from "server/db";
import { session } from "./session";
import { requestRoute } from "./request-route";
import { initialState } from "./initial-state";
import { apiMiddleware } from "./api";
import { apiHandler } from "./api-handler";
import { resetPassword } from "./reset-password";
import { processUser } from "./process-user";
import { processCors } from "./cors";
import { AppState, AppContext } from "types";

async function startServer() {
  console.log("Init app");

  const app = new Koa<AppState, AppContext>();

  const db = await getDbApi();

  app.context.db = db;

  app.use(sendStatic);
  app.use(bodyParser());
  app.use(session);
  app.use(processUser);
  app.use(apiMiddleware);
  app.use(requestRoute);
  app.use(processCors);
  app.use(apiHandler);
  app.use(resetPassword);
  app.use(initialState);
  app.use(renderHtml);

  app.listen(HTTP_PORT);

  console.log(`App is running on port ${HTTP_PORT}`);
}

startServer();
