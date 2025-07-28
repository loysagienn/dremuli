import { State, Text } from "types";

declare global {
  interface Window {
    __INITIAL_STATE__: State;
    __CSRF_TOKEN__: string;
    __I18N__: {
      en?: Text | null;
      ru?: Text | null;
    };
  }
}
