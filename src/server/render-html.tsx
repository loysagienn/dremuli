import { AppContext, Lang, State, Text } from "types";
import { renderToString } from "react-dom/server";
import { renderApp, initStore } from "app/app";
import { en } from "lang/en";
import { ru } from "lang/ru";
import { TextProvider } from "lang/context";
import React from "react";
import { atom } from "nanostores";

const langs: { [key in Lang]: Text } = {
  en,
  ru,
};

function serializeState(state: State) {
  return JSON.stringify(state)
    .replace(
      /"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)"/g,
      'new Date("$1")'
    )
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E")
    .replace(/&/g, "\\u0026");
}

const favicon = `
<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon_16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon_32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/static/favicon_48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/static/favicon_192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/static/favicon_512.png">
`;

export async function renderHtml(ctx: AppContext) {
  const { initialState, api } = ctx.state;
  const { language } = initialState.settings;

  const text = langs[language];

  const store = initStore(initialState, api);
  const content = renderToString(renderApp(store, atom(text)));

  ctx.body = `<html>
<head>
  <meta charset="UTF-8">
  ${favicon}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="/static/manifest.json" />

  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="Dremuli" />
  <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon_180.png">

  <link rel="stylesheet" href="/static/bundle/app.css?v=${__APP_VERSION__}"></link>
</head>
<body>
  <div id="root">${content}</div>
  <script>window.__INITIAL_STATE__ = ${serializeState(initialState)}</script>
  <script type="module" src="/static/bundle/inject-${language}.js?v=${__APP_VERSION__}"></script>
  <script type="module" src="/static/bundle/app.js?v=${__APP_VERSION__}"></script>
</body>
</html>`;
}
