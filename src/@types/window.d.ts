import { State } from "types";

declare global {
  interface Window {
    __INITIAL_STATE__: State;
    __CSRF_TOKEN__: string;
  }
}
