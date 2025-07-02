import { hydrateRoot } from "react-dom/client";
import { renderApp, initStore } from "app/app";
import { connectStoreToHistory } from "./router";
import { api } from "./api";

const { __INITIAL_STATE__: initialState } = window;

const store = initStore(initialState, api);
connectStoreToHistory(store);

hydrateRoot(document.getElementById("root"), renderApp(store));
