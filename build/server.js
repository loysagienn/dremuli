import * as esbuild from "esbuild";

function getOptions(NODE_ENV, APP_VERSION) {
  /**
   * @type {esbuild.BuildOptions}
   */
  const options = {
    entryPoints: ["./src/server/app.ts"],
    bundle: true,
    outdir: "./dist",
    platform: "neutral",
    external: [
      "koa",
      "path",
      "bcrypt",
      "./node_modules/*",
      "fs",
      "node:*",
      "nodemailer",
      "crypto",
    ],
    format: "esm",
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
    },
    minify: NODE_ENV === "production",
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
