import { hydrateRoot } from "react-dom/client";
import { renderApp, initStore } from "app/app";
import { connectStoreToHistory } from "./router";
import { setDefaults } from "./set-defaults";
import { registerServiceWorker } from "./register-sw";
import { api } from "./api";
import { initText } from "./text";
import { getCurrentDay, getCurrentMinute } from "utils/date";

const { __INITIAL_STATE__: initialState } = window;

if (initialState) {
  initialState.currentTime.time = getCurrentMinute();
  initialState.currentTime.date = getCurrentDay();
}

const store = initStore(initialState, api);
setDefaults(store);
connectStoreToHistory(store);

hydrateRoot(document.getElementById("root"), renderApp(store, initText(store)));

registerServiceWorker();
