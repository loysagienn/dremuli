import React, { ReactNode } from "react";
import { App } from "components/app";
import { Store, State, AnyAction, Api, Text } from "types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "reducers";
import { actionHandlersMiddleware } from "utils/action-handlers-middleware";
import { basicHandlers } from "action-handlers";
import { Atom } from "nanostores";
import { TextProvider } from "lang/context";
import { useStore } from "@nanostores/react";

type LangProviderProps = {
  $text: Atom<Text>;
  children: ReactNode;
};

function LangProvider({ $text, children }: LangProviderProps) {
  const text = useStore($text);

  return <TextProvider value={text}>{children}</TextProvider>;
}

export function renderApp(store: Store, $text: Atom<Text>) {
  return (
    <Provider store={store}>
      <LangProvider $text={$text}>
        <App />
      </LangProvider>
    </Provider>
  );
}

export function initStore(initialState: State | null, api: Api) {
  return configureStore<State, AnyAction>({
    reducer,
    preloadedState: initialState,
    // @ts-ignore
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        thunk: { extraArgument: api },
      });

      return defaultMiddleware.concat(
        ...actionHandlersMiddleware([basicHandlers], api)
      );
    },
  });
}
