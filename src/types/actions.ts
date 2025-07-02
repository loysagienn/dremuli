import * as actions from "actions";
import type { Api } from "./api";
import type { GetState, Dispatch } from "./store";

export type AnyAction = ReturnType<(typeof actions)[keyof typeof actions]>;
export type ActionType = AnyAction["type"];

export type Action<TActionType extends ActionType = ActionType> = Extract<
  AnyAction,
  { type: TActionType }
>;

export type ActionHandlersOptions<TActionType extends ActionType = ActionType> =
  {
    action: Action<TActionType>;
    dispatch: Dispatch;
    getState: GetState;
    api: Api;
    next: Dispatch;
  };

export type ActionHandler<TActionType extends ActionType = ActionType> = (
  options: ActionHandlersOptions<TActionType>
) => void;

export type ActionHandlers = {
  [key in ActionType]?: ActionHandler<key>;
};
