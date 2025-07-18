import * as esbuild from "esbuild";
import svgrPlugin from "esbuild-plugin-svgr";

function getOptions(NODE_ENV, APP_VERSION) {
  /**
   * @type {esbuild.BuildOptions}
   */
  const options = {
    entryPoints: ["./src/service-worker/service-worker.ts"],
    bundle: true,
    outdir: "./public/bundle",
    format: "esm",
    splitting: true,
    publicPath: "/static/bundle",
    minify: false,
    alias: {
      config: "config/client",
    },
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
    },
    minify: false,
    plugins: [svgrPlugin()],
  };

  return options;
}

export async function buildServiceWorker(NODE_ENV, APP_VERSION) {
  const options = getOptions(NODE_ENV, APP_VERSION);

  if (NODE_ENV === "production") {
    const result = await esbuild.build(options);
  } else {
    const ctx = await esbuild.context(options);

    await ctx.watch();
  }
}
