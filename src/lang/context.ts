import { createContext, useContext } from "react";
import { Text } from "types";

export const textContext = createContext<Text>(null);

const { Provider: TextProvider } = textContext;

export { TextProvider };

export function useText() {
  return useContext(textContext);
}
