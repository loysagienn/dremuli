import type { Store as ReduxStore } from "redux";
import type { State } from "reducers";
import type { Action } from "./actions";

export type Store = ReduxStore<State, Action>;
export type Dispatch = Store["dispatch"];
export type GetState = Store["getState"];
export { State };
