import React from "react";
import { App } from "components/app";
import { Store, State, AnyAction, Api } from "types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "reducers";
import { actionHandlersMiddleware } from "utils/action-handlers-middleware";
import { basicHandlers } from "action-handlers";

export function renderApp(store: Store) {
  return (
    <Provider store={store}>
      <App />
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
