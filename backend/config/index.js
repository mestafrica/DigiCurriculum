import dev from "./dev.js";
import prod from "./prod.js";
import test from "./test.js";
import combined from "./combined.js";

const env = process.env.NODE_ENV || "development";

let config;

switch (env) {
  case "production":
    config = prod;
    break;
  case "test":
    config = test;
    break;
  case "combined":
    config = combined;
    break;
  default:
    config = dev;
}

config.allowedOrigins.forEach((origin) => {
  if (
    !origin.startsWith("https://") &&
    !origin.startsWith("http://localhost")
  ) {
    throw new Error(`Insecure origin: ${origin}`);
  }
});

export default config;
