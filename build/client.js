import * as esbuild from "esbuild";
import svgrPlugin from "esbuild-plugin-svgr";

function getOptions(NODE_ENV, APP_VERSION) {
  /**
   * @type {esbuild.BuildOptions}
   */
  const options = {
    entryPoints: ["./src/client/app.tsx"],
    bundle: true,
    outdir: "./public",
    format: "esm",
    minify: false,
    alias: {
      "react-dom/client": "https://esm.sh/react-dom@19.1.0/client",
      react: "https://esm.sh/react@19.1.0",
      redux: "https://esm.sh/redux@5.0.1",
      "react-redux": "https://esm.sh/react-redux@9.2.0",
      "@reduxjs/toolkit": "https://esm.sh/@reduxjs/toolkit@2.8.2",
      config: "config/client",
    },
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
    },
    minify: NODE_ENV === "production",
    plugins: [svgrPlugin()],
  };

  return options;
}

export async function buildClient(NODE_ENV, APP_VERSION) {
  const options = getOptions(NODE_ENV, APP_VERSION);

  if (NODE_ENV === "production") {
    const result = await esbuild.build(options);
  } else {
    const ctx = await esbuild.context(options);

    await ctx.watch();
  }
}
