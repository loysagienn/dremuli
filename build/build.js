import { buildClient } from "./client.js";
import { buildServer } from "./server.js";

const NODE_ENV = process.env.NODE_ENV || "production";

const APP_VERSION = new Date().toISOString();

buildServer(NODE_ENV, APP_VERSION);
buildClient(NODE_ENV, APP_VERSION);
