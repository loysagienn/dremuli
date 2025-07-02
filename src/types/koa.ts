import type { ParameterizedContext, Next } from "koa";
import type { DbApi } from "server/db";
import type { Session } from "./db";
import type { State } from "./store";
import type { Api } from "./api";
import { AppRoute } from "app/router";

export type AppState = {
  session: Session;
  initialState: State;
  route: AppRoute;
  api: Api;
};

export type AppContextExtend = {
  db: DbApi;
};

export type AppContext = ParameterizedContext<AppState, AppContextExtend>;

export type AppNext = Next;
