import { Action, ActionType } from "types";

type Handlers<TState> = {
  [key in ActionType]?: (state: TState, action: Action<key>) => TState;
};

export function createReducer<TState>(
  handlers: Handlers<TState>,
  defaultState: TState
) {
  return (state: TState = defaultState, action: Action): TState => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}
