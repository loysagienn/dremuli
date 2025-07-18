import { hydrateRoot } from "react-dom/client";
import { renderApp, initStore } from "app/app";
import { connectStoreToHistory } from "./router";
import { setDefaults } from "./set-defaults";
import { registerServiceWorker } from "./register-sw";
import { api } from "./api";

const { __INITIAL_STATE__: initialState } = window;

const store = initStore(initialState, api);
setDefaults(store);
connectStoreToHistory(store);

hydrateRoot(document.getElementById("root"), renderApp(store));

registerServiceWorker();
