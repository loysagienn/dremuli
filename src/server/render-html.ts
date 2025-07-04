import { AppContext, State } from "types";
import { renderToString } from "react-dom/server";
import { renderApp, initStore } from "app/app";

function serializeWithDates(state: State) {
  return JSON.stringify(
    state,
    (key, value) => {
      if (value instanceof Date) {
        return `__DATE__${value.toISOString()}`; // Temporary marker
      }
      return value;
    },
    2
  ).replace(/"__DATE__(.*?)"/g, 'new Date("$1")'); // Replace marker with code
}

const favicon = `
<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon_light_16.png" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon_light_32.png" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/png" sizes="48x48" href="/static/favicon_light_48.png" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/png" sizes="192x192" href="/static/favicon_light_192.png" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/png" sizes="512x512" href="/static/favicon_light_512.png" media="(prefers-color-scheme: light)">

<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon_dark_16.png" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon_dark_32.png" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/png" sizes="48x48" href="/static/favicon_dark_48.png" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/png" sizes="192x192" href="/static/favicon_dark_192.png" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/png" sizes="512x512" href="/static/favicon_dark_512.png" media="(prefers-color-scheme: dark)">

<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon_light_180.png">
`;

export async function renderHtml(ctx: AppContext) {
  const { initialState, api } = ctx.state;

  const store = initStore(initialState, api);
  const content = renderToString(renderApp(store));

  ctx.body = `<html>
<head>
  <meta charset="UTF-8">
  ${favicon}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/static/app.css?v=${__APP_VERSION__}"></link>
</head>
<body>
  <div id="root">${content}</div>
  <script>window.__INITIAL_STATE__ = ${serializeWithDates(
    initialState
  )}</script>
  <script type="module" src="/static/app.js?v=${__APP_VERSION__}"></script>
</body>
</html>`;
}
