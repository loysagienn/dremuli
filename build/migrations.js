import * as esbuild from "esbuild";
import { readdir } from "fs/promises";
import { external } from "./constants.js";

export async function buildMigrations() {
  const files = await readdir("./src/server/migrations");

  const entryPoints = files
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `./src/server/migrations/${file}`);

  /**
   * @type {esbuild.BuildOptions}
   */
  const options = {
    entryPoints,
    entryNames: "[name]",
    outdir: "./dist/migrations",
    bundle: true,
    platform: "neutral",
    external: external,
    format: "esm",
    minify: false,
  };

  const result = await esbuild.build(options);
}

buildMigrations();
