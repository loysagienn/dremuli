import { Middleware } from "@reduxjs/toolkit";
import {
  Store,
  State,
  Dispatch,
  ActionType,
  Action,
  ActionHandlers,
  ActionHandler,
  Api,
} from "types";

export function actionHandlersMiddleware(
  actionHandlersList: ActionHandlers[],
  api: Api
): Middleware<Dispatch, State>[] {
  return actionHandlersList.map((handlers) => {
    return ({ dispatch, getState }: Store) => {
      return (next: Dispatch) =>
        <TActionType extends ActionType = ActionType>(
          action: Action<TActionType>
        ) => {
          const handler = handlers[action.type] as ActionHandler<TActionType>;

          if (handler) {
            return handler({ action, dispatch, getState, api, next });
          }

          return next(action);
        };
    };
  });
}
