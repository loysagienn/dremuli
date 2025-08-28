import React, { ReactNode } from "react";
import { App } from "components/app";
import { Store, State, AnyAction, Api, Text } from "types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "reducers";
import { actionHandlersMiddleware } from "utils/action-handlers-middleware";
import { basicHandlers, confirmHandlers } from "action-handlers";
import { TextProvider } from "lang/context";
import { Quant, useQuant } from "utils/quant";

type LangProviderProps = {
  $text: Quant<Text>;
  children: ReactNode;
};

function LangProvider({ $text, children }: LangProviderProps) {
  const text = useQuant($text);

  return <TextProvider value={text}>{children}</TextProvider>;
}

export function renderApp(store: Store, $text: Quant<Text>) {
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
      const defaultMiddleware = getDefaultMiddleware({});

      return defaultMiddleware.concat(
        ...actionHandlersMiddleware([confirmHandlers, basicHandlers], api)
      );
    },
  });
}
