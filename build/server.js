import * as esbuild from "esbuild";
import svgrPlugin from "esbuild-plugin-svgr";
import { external } from "./constants.js";

function getOptions(NODE_ENV, APP_VERSION) {
  /**
   * @type {esbuild.BuildOptions}
   */
  const options = {
    entryPoints: ["./src/server/app.ts"],
    bundle: true,
    outdir: "./dist",
    platform: "neutral",
    external: external,
    format: "esm",
    splitting: false,
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
    },
    minify: false,
    plugins: [svgrPlugin()],
  };

  return options;
}

export async function buildServer(NODE_ENV, APP_VERSION) {
  const options = getOptions(NODE_ENV, APP_VERSION);

  if (NODE_ENV === "production") {
    const result = await esbuild.build(options);
  } else {
    const ctx = await esbuild.context(options);

    await ctx.watch();
  }
}
